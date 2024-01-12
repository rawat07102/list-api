import { NextFunction, Request, Response } from "express"
import { PlaylistModel } from "../models/playlist.model.js"
import { getAuthenticatedUser } from "./user.controllers.js"
import { validateWithSchema } from "../lib/validateZodSchema.js"
import {
    renamePlaylistSchema,
    addVideoToPlaylistSchema,
} from "../schemas/playlist.schemas.js"
import { ImageModel } from "../models/image.model.js"

type getAllPlaylistRequest = Request<
    any,
    any,
    any,
    {
        limit?: string
        skip?: string
    }
>

export async function uploadThumbnail(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const playlistId = req.params.id
        if (!req.file) {
            throw new Error("No File Found")
        }
        const playlist = await PlaylistModel.findById(playlistId).orFail()
        const { buffer, mimetype } = req.file
        const thumbnail = new ImageModel({
            data: buffer.toString("base64"),
            mimetype,
        })
        if (playlist.thumbnail) {
            await ImageModel.findByIdAndDelete(playlist.thumbnail)
        }
        playlist.thumbnail = thumbnail.id
        await thumbnail.save()
        await playlist.save()
        return res.json(thumbnail.id)
    } catch (err) {
        next(err)
    }
}

export async function getAllPlaylist(
    req: getAllPlaylistRequest,
    res: Response
) {
    const { limit = "10", skip = "0" } = req.query
    const playlists = await PlaylistModel.find()
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .exec()
    return res.json(playlists)
}

export async function getPlaylist(req: Request, res: Response) {
    const { id } = req.params
    const playlist = await PlaylistModel.findById(id).orFail()
    return res.json(playlist)
}

export async function createNewPlaylist(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req.user)
    const newPlaylist = await PlaylistModel.create({
        title: "Playlist #" + user.playlists.length,
        creator: user,
    })
    user.playlists.push(newPlaylist.id)
    await newPlaylist.save()
    await user.save()
    return res.json(newPlaylist)
}

export async function renamePlaylist(req: Request, res: Response) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const { title } = await validateWithSchema(req.body, renamePlaylistSchema)
    const playlist = await PlaylistModel.findOne({
        _id: id,
        creator: user._id,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    playlist.title = title
    await playlist.save()
    return res.json(playlist.id)
}

export async function deletePlaylist(req: Request, res: Response) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const playlist = await PlaylistModel.findOneAndDelete({
        _id: id,
        creator: user._id,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    user.playlists.filter((p) => p.id !== playlist.id)
    await user.save()
    return res.json(playlist.id)
}

export async function addVideoToPlaylist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params
        const user = await getAuthenticatedUser(req.user)
        const { videoId } = await validateWithSchema(
            req.body,
            addVideoToPlaylistSchema
        )
        const playlist = await PlaylistModel.findOne({
            _id: id,
            creator: user._id,
        }).orFail()

        playlist.videos.push(videoId)
        await playlist.save()

        return res.json({ playlistId: playlist._id, videoId })
    } catch (err) {
        next(err)
    }
}

export async function removeVideoFromPlaylist(req: Request, res: Response) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const { videoId } = await validateWithSchema(
        req.body,
        addVideoToPlaylistSchema
    )
    const playlist = await PlaylistModel.findOne({
        _id: id,
        creator: user._id,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    playlist.videos = playlist.videos.filter((v) => v !== videoId)
    await playlist.save()
    return res.json(playlist.id)
}

export async function getPlaylistsByUserId(req: Request, res: Response) {
    const { userId } = req.params
    const { limit = "10", skip = "0" } = req.query as {
        limit?: string
        skip?: string
    }
    const playlists = await PlaylistModel.find({
        creator: userId,
    })
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .orFail()

    return res.json(playlists)
}

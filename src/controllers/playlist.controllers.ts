import { Request } from "express"
import { PlaylistModel } from "../models/playlist.model.js"
import { getAuthenticatedUser } from "./user.controllers.js"
import { validateWithSchema } from "../lib/validateZodSchema.js"
import {
    renamePlaylistSchema,
    addVideoToPlaylistSchema,
} from "../schemas/playlist.schemas.js"

type getAllPlaylistRequest = Request<
    any,
    any,
    any,
    {
        limit?: string
        skip?: string
    }
>

export async function getAllPlaylist(req: getAllPlaylistRequest) {
    const { limit = "10", skip = "0" } = req.query
    const playlists = PlaylistModel.find()
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .exec()
    return playlists
}

export async function getPlaylist(req: Request) {
    const { id } = req.params
    const playlist = await PlaylistModel.findById(id)
    if (!playlist) {
        throw new Error("Playlist not found")
    }
    return playlist
}

export async function createNewPlaylist(req: Request) {
    const user = await getAuthenticatedUser(req.user)
    const newPlaylist = await PlaylistModel.create({
        name: user.playlists.length,
        creator: user,
    })
    user.playlists.push(newPlaylist.id)
    await newPlaylist.save()
    await user.save()
    return newPlaylist
}

export async function renamePlaylist(req: Request) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const { name } = await validateWithSchema(req.body, renamePlaylistSchema)
    const playlist = await PlaylistModel.findOne({
        id,
        creator: user,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    playlist.name = name
    await playlist.save()
    return playlist.id
}

export async function deletePlaylist(req: Request) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const playlist = await PlaylistModel.findOneAndDelete({
        id,
        creator: user,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    user.playlists.filter((p) => p.id !== playlist.id)
    await user.save()
    return playlist.id
}

export async function addVideoToPlaylist(req: Request) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const { videoId } = await validateWithSchema(
        req.body,
        addVideoToPlaylistSchema
    )
    const playlist = await PlaylistModel.findOne({
        id,
        creator: user,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    playlist.videos.push(videoId)
    await playlist.save()
    return playlist.id
}

export async function removeVideoFromPlaylist(req: Request) {
    const { id } = req.params
    const user = await getAuthenticatedUser(req.user)
    const { videoId } = await validateWithSchema(
        req.body,
        addVideoToPlaylistSchema
    )
    const playlist = await PlaylistModel.findOne({
        id,
        creator: user,
    })
    if (!playlist) {
        throw Error("Playlist not found")
    }
    playlist.videos = playlist.videos.filter((v) => v !== videoId)
    await playlist.save()
    return playlist.id
}

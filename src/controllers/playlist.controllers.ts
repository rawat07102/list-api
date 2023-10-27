import { Request } from "express"
import { PlaylistModel } from "../models/playlist.model.js"
import { getAuthenticatedUser } from "./user.controllers.js"
import { validateWithSchema } from "../lib/validateZodSchema.js"
import { renamePlaylistSchema } from "../schemas/playlist.schemas.js"

export async function getPlaylist(req: Request) {
    const {id} = req.params
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
        creator: user
    })
    user.playlists.push(newPlaylist.id)
    await newPlaylist.save()
    await user.save()
    return newPlaylist
}

export async function renamePlaylist(req: Request) {
    const {id} = req.params
    const { name } = await validateWithSchema(req.body, renamePlaylistSchema)
    const playlist = await PlaylistModel.findById(id)
    if (!playlist) {
        throw Error("Playlist not found")
    }
    playlist.name = name
    await playlist.save()
}

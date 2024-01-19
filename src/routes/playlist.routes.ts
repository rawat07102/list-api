import { Router } from "express"
import {
    addVideoToPlaylist,
    createNewPlaylist,
    getAllPlaylist,
    getPlaylistById,
    getPlaylistsByUserId,
    renamePlaylist,
    uploadThumbnail,
} from "../controllers/playlist.controllers.js"
import { authGuard } from "../lib/authGuard.js"
import { uploader } from "../lib/uploader.js"

export const playlistRoutes = Router()

playlistRoutes.get("/all", getAllPlaylist)
playlistRoutes.post("/create-new", authGuard, createNewPlaylist)
playlistRoutes.post("/rename", authGuard, renamePlaylist)
playlistRoutes.get("/user-playlists/:userId", getPlaylistsByUserId)
playlistRoutes.post("/:id/change-thumbnail", uploader.single("thumbnail"), uploadThumbnail)
playlistRoutes.post("/:id/addVideo", authGuard, addVideoToPlaylist)
playlistRoutes.patch("/:id/removeVideo", authGuard, addVideoToPlaylist)
playlistRoutes.get("/:id", getPlaylistById)

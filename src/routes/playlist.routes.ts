import { Router } from "express"
import { addVideoToPlaylist, createNewPlaylist, getAllPlaylist , getPlaylist, renamePlaylist } from "../controllers/playlist.controllers.js"
import { authGuard } from "../lib/authGuard.js"

export const playlistRoutes = Router()

playlistRoutes.get("/all", getAllPlaylist)
playlistRoutes.post("/create-new", authGuard, createNewPlaylist)
playlistRoutes.post("/rename", authGuard, renamePlaylist)
playlistRoutes.post("/:id/addVideo", authGuard, addVideoToPlaylist)
playlistRoutes.patch("/:id/removeVideo", authGuard, addVideoToPlaylist)
playlistRoutes.get("/", getPlaylist)

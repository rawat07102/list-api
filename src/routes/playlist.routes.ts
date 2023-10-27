import { Router } from "express"
import { createNewPlaylist, getPlaylist } from "../controllers/playlist.controllers.js"
import { authGuard } from "../lib/authGuard.js"

export const playlistRoutes = Router()

playlistRoutes.get("/", getPlaylist)
playlistRoutes.post("/create-new", authGuard, createNewPlaylist)

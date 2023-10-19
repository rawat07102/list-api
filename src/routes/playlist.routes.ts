import { Router } from "express"
import { getPlaylist } from "../controllers/playlist.controllers.js"

export const playlistRoutes = Router()

playlistRoutes.get("/", getPlaylist)

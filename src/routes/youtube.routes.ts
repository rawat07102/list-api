import { Router } from "express"
import { getVideoById } from "../controllers/youtube.controllers.js"

export const youtubeRoutes = Router()

youtubeRoutes.get("/video/:id", getVideoById)

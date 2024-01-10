import { Router } from "express"
import { getImageById } from "../controllers/image.controllers.js"

export const imageRoutes = Router()

imageRoutes.get("/:id", getImageById)
import { Router } from "express"
import {
    getUserById,
    getUsersPlaylists,
    login,
    signup,
} from "../controllers/user.controllers.js"
import { authGuard } from "../lib/authGuard.js"

export const userRoutes = Router()

userRoutes.get("/playlists", authGuard, getUsersPlaylists)
userRoutes.post("/signup", signup)
userRoutes.post("/login", login)
userRoutes.get("/:id", getUserById)

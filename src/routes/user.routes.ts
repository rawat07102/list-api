import { Router } from "express"
import { login, signup } from "../controllers/user.controllers.js"

export const userRoutes = Router()

userRoutes.post("/signup", signup)
userRoutes.post("/login", login)

import { NextFunction, Request, Response } from "express"
import { UserModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { envVars } from "../lib/envVars.js"
import { IAuthPayload } from "../lib/authGuard.js"
import { userCredsSchema } from "../schemas/user.schemas.js"
import { validateWithSchema } from "../lib/validateZodSchema.js"
import { Playlist } from "../models/playlist.model.js"

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params
    const user = await UserModel.findById(id).select("-password")
    if (!user) {
        throw new Error("User not found with given id")
    }
    return res.json(user)
}

export async function getAuthenticatedUser(payload: IAuthPayload | undefined) {
    if (!payload) {
        throw new Error("Un-Authenticated")
    }
    const user = await UserModel.findById(payload.id)
    if (!user) {
        throw new Error("Un-Authenticated")
    }
    return user
}

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const userCreds = await validateWithSchema(req.body, userCredsSchema)

        const { username, password } = userCreds
        const existingUser = await UserModel.findOne({ username, password })

        if (existingUser) {
            return res.status(400).json({
                error: {
                    message: "User already exists",
                },
            })
        }

        // const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            username,
            password,
        })
        await newUser.save()
        return res.json(newUser)
    } catch (err) {
        next(err)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const userCreds = await validateWithSchema(req.body, userCredsSchema)

        const { username, password } = userCreds
        const user = await UserModel.findOne({ username, password }).orFail()

        jwt.sign(
            {
                username,
                id: user.id,
            },
            envVars.JWT_SECRET,
            (err: Error | null, encoded: string | undefined) => {
                if (err) throw err
                let accessToken = encoded
                return res.json(accessToken)
            }
        )
    } catch (err) {
        next(err)
    }
}

export async function getUsersPlaylists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = await getAuthenticatedUser(req.user)

        const user = await UserModel.findById(id)
            .populate<{
                playlists: Playlist[]
            }>("playlists")
            .orFail()
        return res.json(user.playlists)
    } catch (err) {
        next(err)
    }
}

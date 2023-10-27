import { NextFunction, Request, Response } from "express"
import { UserModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { envVars } from "../lib/envVars.js"
import { IAuthPayload } from "../lib/authGuard.js"
import { userCredsSchema } from "../schemas/user.schemas.js"
import { validateWithSchema } from "../lib/validateZodSchema.js"

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
        return newUser
    } catch (err) {
        next(err)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const userCreds = await validateWithSchema(req.body, userCredsSchema)

        const { username, password } = userCreds
        const user = await UserModel.findOne({ username, password })

        if (!user) {
            throw new Error("Invalid user credentials")
        }
        let token: string | undefined
        jwt.sign(
            {
                username,
                id: user.id,
            },
            envVars.JWT_SECRET,
            (err: Error | null, encoded: string | undefined) => {
                if (err) throw err
                token = encoded
            }
        )
        return res.json({
            token,
        })
    } catch (err) {
        next(err)
    }
}

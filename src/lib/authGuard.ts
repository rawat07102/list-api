import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { envVars } from "../lib/envVars.js"

export interface IAuthPayload {
    id: string
    username: string
}

export async function authGuard(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            message: "Un-Authorized",
        })
    }
    const payload = jwt.verify(token, envVars.JWT_SECRET) as IAuthPayload
    req.user = payload
    next()
}

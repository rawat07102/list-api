import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken"
import { envVars } from "../lib/envVars.js"

export interface IAuthPayload {
    id: string
    username: string
}

export async function authGuard(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return next({
            message: "Un-Authorized",
            code: 401,
        })
    }
    jwt.verify(token, envVars.JWT_SECRET, (err, payload) => {
        if (err) {
            next({
                message: "Un-Authorized",
                code: 401,
            })
        }
        req.user = payload as IAuthPayload
        next()
    })
}

import { NextFunction, Request, Response } from "express"

type Error = {
    message: string
    code?: number
}

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error(err.message)
    return res.status(err.code || 500).json({
        message: err.message,
    })
}

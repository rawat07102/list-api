import {Request, Response } from "express"

export function login(req: Request, res: Response) {
    console.log(req.params)
    return res.json({
        name: "playlist 1"
    })
}


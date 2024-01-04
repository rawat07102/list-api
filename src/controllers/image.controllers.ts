import { NextFunction, Request, Response } from "express"
import { ImageModel } from "../models/image.model.js"

export async function getImageById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const imageId = req.params.id
        const image = await ImageModel.findById(imageId).orFail()
        res.writeHead(200, { "Content-Type": image.mimetype })
        res.write(Buffer.from(image.data, "base64"), (err) => {
            if (err) {
                throw err
            }
            res.end()
        })
    } catch (err) {
        next(err)
    }
}

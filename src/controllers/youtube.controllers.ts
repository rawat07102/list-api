import { Request, Response, NextFunction } from "express"
import { envVars } from "../lib/envVars.js"
import axios from "axios"
import { Video, YTResponse } from "../types/youtube.types.js"

axios.defaults.baseURL = "https://youtube.googleapis.com/youtube/v3"
axios.defaults.params = { key: envVars.YT_API_KEY }
axios.defaults.headers.common["Content-Type"] = "application/json"

export async function getVideoById(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const videoId = "hY02oEKfPfg"
        const ytRes = await axios.get<YTResponse<Video>>("/videos", {
            params: {
                id: videoId,
                part: "snippet,statistics",
                fields: "items(id,snippet(title, thumbnails(default), categoryId, publishedAt),statistics(viewCount))",
            },
        })
        return res.json(ytRes.data)
    } catch (err) {
        next(err)
    }
}

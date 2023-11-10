import z from "zod"

export const renamePlaylistSchema = z.object({
    name: z.string()
})

export const addVideoToPlaylistSchema = z.object({
    videoId: z.string()
})

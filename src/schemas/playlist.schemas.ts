import z from "zod"

export const renamePlaylistSchema = z.object({
    title: z.string()
})

export const addVideoToPlaylistSchema = z.object({
    videoId: z.string()
})

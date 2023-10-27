import z from "zod"

export const renamePlaylistSchema = z.object({
    name: z.string()
})

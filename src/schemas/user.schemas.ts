import z from "zod";

export const userCredsSchema = z.object({
    username: z.string(),
    password: z.string(),
})

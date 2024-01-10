import z from "zod"
import { config } from "dotenv"
import path from "path"

config({
    path: path.resolve(process.cwd(), ".env.local"),
})

const envSchema = z.object({
    MONGO_URI: z.string(),
    PORT: z.coerce.number().default(4000),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    JWT_SECRET: z.string(),
    CLIENT_ORIGIN: z.string(),
    YT_API_KEY: z.string(),
})

const envParseResult = envSchema.safeParse(process.env)

if (!envParseResult.success) {
    console.error(envParseResult.error.issues)
    throw new Error("There is an error with the environment variables")
}

export const envVars = envParseResult.data

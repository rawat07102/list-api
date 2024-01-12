import { envVars } from "./lib/envVars.js"
import express from "express"
import bodyParser from "body-parser"
import { playlistRoutes } from "./routes/playlist.routes.js"
import { userRoutes } from "./routes/user.routes.js"
import { connect as MongooseConnect } from "mongoose"
import cors from "cors"
import { imageRoutes } from "./routes/image.routes.js"
import { youtubeRoutes } from "./routes/youtube.routes.js"
import { errorHandler } from "./lib/errorHandler.js"

const { PORT, MONGO_URI, CLIENT_ORIGIN } = envVars
const app = express()
app.use(bodyParser.json())
app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    })
)

app.use("/playlist", playlistRoutes)
app.use("/youtube", youtubeRoutes)
app.use("/user", userRoutes)
app.use("/image", imageRoutes)
app.use(errorHandler)

async function main() {
    try {
        await MongooseConnect(MONGO_URI)
    } catch (err) {
        console.error("Error connecting MongoDB")
    }
    app.listen(PORT, () => console.log("running on port " + PORT))
}

main()

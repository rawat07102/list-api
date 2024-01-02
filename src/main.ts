import { envVars } from "./lib/envVars.js"
import express from "express"
import bodyParser from "body-parser"
import { playlistRoutes } from "./routes/playlist.routes.js"
import { userRoutes } from "./routes/user.routes.js"
import { connect as MongooseConnect } from "mongoose"

const { PORT, MONGO_URI } = envVars
const app = express()
app.use(bodyParser.json())
app.use("/playlist", playlistRoutes)
app.use("/user", userRoutes)

async function main() {
    await MongooseConnect(MONGO_URI)
    app.listen(PORT, () => console.log("running on port " + PORT))
}

main()

import express from "express"
import { playlistRoutes } from "./routes/playlist.routes.js"
import { userRoutes } from "./routes/user.routes.js"

const PORT = 4000
const app = express()

app.use("/playlist", playlistRoutes)
app.use("/user", userRoutes)

app.listen(PORT, () => console.log("running on port " + PORT))

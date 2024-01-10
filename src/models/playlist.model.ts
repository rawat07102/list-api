import { Schema, model, InferSchemaType } from "mongoose"

// export interface Playlist {
//     name: string
//     creator: Types.ObjectId
//     videos: string[]
// }

const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        videos: [{ type: String, default: [] }],
        thumbnail: { type: Schema.Types.ObjectId, ref: "Image" },
    },
    { timestamps: true }
)

export type Playlist = InferSchemaType<typeof playlistSchema>

export const PlaylistModel = model<Playlist>("Playlist", playlistSchema)

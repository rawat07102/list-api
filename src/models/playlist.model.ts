import { Schema, model, Types } from "mongoose"

export interface IPlaylistModel {
    name: string
    creator: Types.ObjectId
    videos: string[]
}

const playlistSchema = new Schema<IPlaylistModel>({
    name: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    videos: [{type: String, default: []}]
})

export const PlaylistModel = model<IPlaylistModel>("Playlist", playlistSchema)

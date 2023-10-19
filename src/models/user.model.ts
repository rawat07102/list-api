import { Schema, model, Types } from "mongoose"

export interface IUserModel {
    name: string
    password: string
    playlists: Types.ObjectId[]
}

const userSchema = new Schema<IUserModel>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    playlists: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Playlist",
            default: [],
        },
    ],
})

export const PlaylistModel = model<IUserModel>("User", userSchema)

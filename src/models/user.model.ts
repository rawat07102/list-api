import { Schema, model, Types } from "mongoose"

export interface IUserModel {
    username: string
    password: string
    playlists: Types.ObjectId[]
}

const userSchema = new Schema<IUserModel>({
    username: { type: String, required: true },
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

export const UserModel = model<IUserModel>("User", userSchema)
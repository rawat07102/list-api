import { Schema, model, InferSchemaType } from "mongoose"

// export interface User {
//     username: string
//     password: string
//     playlists: Types.ObjectId[]
// }

const userSchema = new Schema({
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

export type User = InferSchemaType<typeof userSchema>

export const UserModel = model<User>("User", userSchema)

import { Schema, model, InferSchemaType } from "mongoose"

const imageSchema = new Schema(
    {
        data: { type: String, required: true },
        mimetype: {type: String, required: true}
    },
    { timestamps: true }
)

export type Image = InferSchemaType<typeof imageSchema>

export const ImageModel = model<Image>("Image", imageSchema)

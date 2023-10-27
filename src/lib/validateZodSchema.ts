import z from "zod";

export async function validateWithSchema<T extends z.ZodTypeAny>(
    data: unknown,
    zodSchema: T
): Promise<z.infer<T>> {
    return zodSchema.parseAsync(data)
}

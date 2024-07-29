import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string({
        message: "Invalid type",
        invalid_type_error: "Enter a valid email"
    }).email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required."
    })
});
import { UserRole } from "@prisma/client";
import * as z from "zod"

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    // isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    // email: z.optional(z.string().email()),
    // password: z.optional(z.string().min(6)),
    // newPassword: z.optional(z.string().min(6)),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required."
    }),
    code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

export const RegisterSchema = z.object({
    name: z.string({
        message: "Name is required"
    }).min(1, {
        message: "Minimum 1 character required."
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required."
    }),
});
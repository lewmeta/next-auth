"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { NewPasswordSchema } from "@/schemas"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return { error: "Missing token!" };
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields!" };
    }

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    console.log("Existing Token:", existingToken)

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExprired = new Date(existingToken.expires) < new Date();

    if (hasExprired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            password: hashedPassword
        },
    });

    return { success: "Password updated!" }
}
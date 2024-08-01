"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    // If you want to perform some server actions
    await signOut();
}
import { auth } from "@/auth";

export const currentUser = async () => {
    const session = await auth();

    return session?.user
}

export const currentRole = async () => {
    const role = await auth();

    return role?.user.role
}
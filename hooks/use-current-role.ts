import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
    const role = useSession();

    return role.data?.user.role
}
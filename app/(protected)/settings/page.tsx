"use client"

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react"


const SettingsPage = () => {
    // const session = await auth(); this is for server only.

    /**
     * this code works for client only
     */
    const session = useSession();

    /**
     * To sign out
     */
    const onClick = () => {
        logout();
    }

    return (
        <div>
            {JSON.stringify(session)}
            <button onClick={onClick}>
                Sign out
            </button>
        </div>

    )
}

export default SettingsPage;
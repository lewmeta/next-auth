"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";


const SettingsPage = () => {

    const session = useCurrentUser();

    const onClick = () => {
        logout();
    }
    return (
        <div>
            <Button onClick={onClick}>
                Sign out
            </Button>
        </div>

    )
}

export default SettingsPage;
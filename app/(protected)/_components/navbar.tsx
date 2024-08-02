import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Navbar = () => {
    return (
        <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={"outline"}
                >
                    <Link href="#">
                        Server</Link>
                </Button>
                <Button
                    asChild
                    variant={"outline"}
                >
                    <Link href="#">
                        Client</Link>
                </Button>

            </div>
            User button
        </div>
    )
}
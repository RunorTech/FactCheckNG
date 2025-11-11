import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { mainLinks } from "@/mock/constant"
import Link from "next/link"
export function ClaimNav() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Menu</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 ml-4 p-3 rounded-2xl">
                    <nav className="space-y-1">
                        {mainLinks.map((link) => (
                            <Link key={link.path} href={link.path}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm"
                                >
                                    <link.icon className="h-5 w-5 mr-3" />
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </nav>
            </PopoverContent>
        </Popover>
    )
}
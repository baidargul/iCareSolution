'use client'
import { FileBarChart2, FileCheck2, ScrollText, Users2Icon, Users, Landmark, Box, Glasses } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"
import { UserButton } from "@clerk/nextjs";
import useNavigationMenuSideBar from "@/hooks/useNavigationMenuSideBar";

const NavigationMenuSideBar = () => {
    const params = useParams()
    const router = useRouter()
    const pageRef: any = useNavigationMenuSideBar()
    const options = [
        {
            name: "overview",
            label: "Overview",
            icon: <FileBarChart2 />,
            link: "/"
        },
        {
            name: "objects",
            label: "Objects",
            icon: <Glasses />,
            link: "/objects/browse"
        },
        {
            name: "sales",
            label: "Sale Orders",
            icon: <FileCheck2 />,
            link: "/sales"
        },
        {
            name: "purchases",
            label: "Purchase Orders",
            icon: <ScrollText />,
            link: "/purchases/browse/"
        },
        {
            name: "inventory",
            label: "Inventory",
            icon: <Box />,
            link: "/inventory"
        },
        {
            name: "customers",
            label: "Customers",
            icon: <Users2Icon />,
            link: "/customers"
        },
        {
            name: "vendors",
            label: "Vendors",
            icon: <Users />,
            link: "/vendors"
        },
        {
            name: "accounts",
            label: "Accounts",
            icon: <Landmark />,
            link: "/accounts"
        },
    ]
    const [active, setActive] = useState(pageRef?.page|| options[0].name)


    function handleClick(option: any) {
        setActive(option.name)
        pageRef.changePage(option.name)
        router.push(option.link)
    }

    return (
        <ScrollArea className="bg-theme-Slate h-[750px] w-56 select-none">
            <div className="py-4 flex flex-col gap-4">
                {
                    options.map((option, index) => {
                        return (
                            <div onClick={() => handleClick(option)} key={option.name} className={`cursor-pointer flex flex-col relative gap-2 px-2 py-2 border-theme-Slate border hover:bg-theme-Primary/20 hover:border-theme-Primary/40 transition-all text-theme-BlackPointer ${active === option.name && "bg-theme-Primary/10  border-theme-Primary/20"}`}>
                                <div className={`${active === option.name ? "opacity-100" : "opacity-0"} h-[80%] w-[2px] rounded-md bg-theme-Primary/80 transition-all absolute left-1 -mt-1`}>
                                </div>
                                <div className=" flex flex-row gap-2">
                                    {option.icon}
                                    {option.label}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </ScrollArea>
    );
}

export default NavigationMenuSideBar;
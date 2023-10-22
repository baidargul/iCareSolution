'use client'
import React from 'react'

import { Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation";
type Props = {}

function ObjectBrowseHeader({}: Props) {
    const router = useRouter();
    const actions = [
        {
            name: "Create Object",
            icon: <Plus />,
            onClick: () => {
                console.log("Create Object");
                router.push("/objects/create");
            }
        },
    ]
    return (
        <div className="flex p-4 justify-between items-center rounded-t-md bg-theme-Secondry select-none ">
            <div className="flex flex-row gap-5 ">
                {
                    actions.map((action, index) => {
                        return (
                            <div onClick={action.onClick} key={index} className="rounded-full p-2 bg-theme-Primary cursor-pointer text-white border border-white/30 hover:rounded-md transition-all">
                                {action.icon}
                            </div>
                        )
                    })
                }
            </div>
            <div className="rounded-full p-2 bg-theme-Primary cursor-pointer text-white border border-white/30 hover:rounded-md transition-all">
                <Search />
            </div>
        </div>
    );
}

export default ObjectBrowseHeader
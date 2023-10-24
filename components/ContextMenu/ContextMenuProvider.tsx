import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"



type Options =
    {
        label: string
        onClick: () => void
    }[]


type Props = {
    children: React.ReactNode
    options: Options
}

const ContextMenuProvider = (props: Props) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
            <ContextMenuContent>
                {
                    props.options.map((option, index) => {
                        return (
                            <ContextMenuItem key={index} onClick={option.onClick}>
                                {option.label}
                            </ContextMenuItem>
                        )
                    })
                }
            </ContextMenuContent>
        </ContextMenu>

    )
}

export default ContextMenuProvider
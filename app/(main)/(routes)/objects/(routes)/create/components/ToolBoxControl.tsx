'use client'
import ToolTipProvider from '@/components/ToolTip/ToolTipProvider'
import { useCreateObject } from '@/hooks/useCreateObjectForm'
import React from 'react'

type Props = {
    tool: {
        name: string,
        value: string,
        icon: React.ReactNode,
        toolTip: string,
    }
}

export const ToolBoxControl = (props: Props) => {
    const objectRef:any = useCreateObject()

    const handleToolClick = () => {
        const newIndex = objectRef.properties.length + 1
        objectRef.createProperty(`${props.tool.name}`, "Description", props.tool.value, newIndex)
    }

    return (
        <ToolTipProvider key={props.tool.name} value={props.tool.toolTip}>
            <div onClick={handleToolClick} key={props.tool.name} className='flex flex-row items-center gap-1 text-sm p-2 border border-transparent hover:bg-theme-Primary/10 rounded-md  hover:border-theme-Primary/30'>
                {props.tool.icon}
                <span>{props.tool.name}</span>
            </div>
        </ToolTipProvider>
    )
}
import React from 'react'
import { Text, BatteryLow, BatteryFull, Binary } from "lucide-react"
import { ToolBoxControl } from './ToolBoxControl'
type Props = {}

const ToolBoxObjectCreate = (props: Props) => {
    const tools = [
        {
            name: 'Text',
            value: "TEXT",
            icon: <Text className='w-4 h-4' />,
            toolTip: 'Simple text input.',
        },
        {
            name: 'Single Selection',
            value: "SELECTSINGLE",
            icon: <BatteryLow className='w-4 h-4' />,
            toolTip: 'Can only select one from available options.',
        },
        {
            name: 'Multiple Selection',
            value: "SELECTMULTIPLE",
            icon: <BatteryFull className='w-4 h-4' />,
            toolTip: 'Can select multiple available options.',
        },
        {
            name: 'Boolean',
            value: "BOOLEAN",
            icon: <Binary className='w-4 h-4' />,
            toolTip: 'Property with only two states: true or false.',
        },
    ]


    return (
        <div className='bg-theme-Slate h-[655px] w-[15%] p-2 border-r'>
            <p className='text-theme-BlackPointer/70 p-1 pl-2 text-sm '>
                Controls
            </p>
            <div className='flex flex-col'>
                {
                    tools.map((tool, index) => {

                        return (
                            <ToolBoxControl tool={tool} key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ToolBoxObjectCreate
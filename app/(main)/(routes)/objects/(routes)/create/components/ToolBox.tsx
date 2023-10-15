import React from 'react'
import { Text, BatteryLow, BatteryFull, Binary } from "lucide-react"
import { ToolBoxControl } from './ToolBoxControl'
type Props = {}

const ToolBoxObjectCreate = (props: Props) => {
    const tools = [
        {
            name: 'Text',
            icon: <Text className='w-4 h-4' />,
            toolTip: 'Simple text input.',
        },
        {
            name: 'Single Selection',
            icon: <BatteryLow className='w-4 h-4' />,
            toolTip: 'Select one from options.',
        },
        {
            name: 'Multiple Selection',
            icon: <BatteryFull className='w-4 h-4' />,
            toolTip: 'Multiple selection from options.',
        },
        {
            name: 'Boolean',
            icon: <Binary className='w-4 h-4' />,
            toolTip: 'True or false value.',
        },
    ]
    return (
        <div className='bg-theme-Slate min-h-screen w-[15%] p-2 border-r'>
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
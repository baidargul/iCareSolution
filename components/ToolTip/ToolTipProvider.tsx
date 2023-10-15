import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { Component } from 'react'

type Props = {
    children: React.ReactNode
    value: string
}

type State = {}

class ToolTipProvider extends Component<Props, State> {
    state = {}

    render() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>{this.props.children}</TooltipTrigger>
                    <TooltipContent className="text-sm font-normal">
                        <p>{this.props.value}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }
}

export default ToolTipProvider
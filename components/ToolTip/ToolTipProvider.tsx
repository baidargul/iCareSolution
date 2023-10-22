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
                        {
                            typeof this.props.value === "string" ? <p>{this.props.value}</p> : this.props.value
                        }
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }
}

export default ToolTipProvider
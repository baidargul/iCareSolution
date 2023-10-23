'use client'

import ToolTipProvider from "@/components/ToolTip/ToolTipProvider";
import { StepBack } from "lucide-react"
import { useRouter } from "next/navigation";

const RouteBackButton = () => {
    const router = useRouter()

    function onClick() {
        router.back()
    }

    return (
        <ToolTipProvider value="Go Back">
            <div onClick={() => onClick()} className='p-1 rounded-md border-2 border-black hover:bg-theme-Primary/10'>
                <StepBack className='w-4 h-4' />
            </div>
        </ToolTipProvider>
    );
}

export default RouteBackButton;
'use client'
import ToolTipProvider from '@/components/ToolTip/ToolTipProvider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBrowseObject } from '@/hooks/useBrowseObject'

import React, { useEffect, useState } from 'react'

type objects = {
    id: number
    name: string
    type: string
    categories: {
        id: string,
        name: string,
    }
    property: {
        id: string,
        name: string,
        description: string,
        type: string,
        propertyValues: propertyValues[]
    }
}

type propertyValues = {
    id: string,
    name: string,
    index: number,
}

type Props = {
    objects: any
}


function ObjectListAction(props: Props) {
    const [objects, setObjects] = useState(props.objects)
    const objectRef: any = useBrowseObject()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
    }, [isMounted])

    function handleObjectSelection(object: objects) {
        objectRef.setObject(object)
    }

    return (
        <ScrollArea>
            {
                objects && isMounted && <div className="flex flex-col justify-start">
                    {
                        objects.map((object: objects) => {
                            console.log(object)
                            return (
                                <div key={object.id} onClick={() => handleObjectSelection(object)} className={`grid grid-cols-3 items-center justify-items-center ${object.id === objectRef.object?.id ? "bg-theme-Primary/20" : ""} cursor-pointer hover:bg-theme-Primary/10 p-2`}>
                                    <ToolTipProvider value={object.name}>
                                        <div className='font-semibold text-xs overflow-hidden text-ellipsis w-16 whitespace-nowrap'>
                                            {
                                                object.name
                                            }
                                        </div>
                                    </ToolTipProvider>
                                    <div className='tracking-tighter text-xs uppercase'>
                                        {
                                            object.type
                                        }
                                    </div>
                                    <ToolTipProvider value={object.categories.name}>
                                        <div className='tracking-tighter overflow-hidden text-ellipsis w-16 whitespace-nowrap text-xs uppercase border-b-2 border-theme-BlackPointer/30 hover:border-t-2 hover:border-b-0 transition-all'>
                                            {
                                                object?.categories?.name
                                            }
                                        </div>
                                    </ToolTipProvider>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </ScrollArea>
    )
}

export default ObjectListAction
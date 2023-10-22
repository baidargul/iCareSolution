'use client'
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
                                    <div className='font-semibold text-xs'>
                                        {
                                            object.name
                                        }
                                    </div>
                                    <div className='tracking-tighter text-xs uppercase'>
                                        {
                                            object.type
                                        }
                                    </div>
                                    <div className='tracking-tighter text-xs uppercase border-b border-theme-BlackPointer'>
                                        {
                                            object?.categories?.name
                                        }
                                    </div>
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
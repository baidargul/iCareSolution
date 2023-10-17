'use client'
import React from 'react'
import { useCreateObject } from "@/hooks/useCreateObjectForm";
import PropertyHolder from './propertyHolder';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {}

export const PropertiesContainer = (props: Props) => {
    const objectRef: any = useCreateObject();
    objectRef.properties.sort((a: any, b: any) => a.index - b.index);
    return (
        <ScrollArea className='h-[500px] '>
            <div className='flex flex-col gap-1 pr-4 py-2'>

                {
                    objectRef.properties.map((property: any, index: number) => {
                        return (
                            <div key={property.id} id={property.id}>
                                <PropertyHolder property={property} />
                            </div>
                        )
                    })
                }
            </div>
        </ScrollArea>
    )
}
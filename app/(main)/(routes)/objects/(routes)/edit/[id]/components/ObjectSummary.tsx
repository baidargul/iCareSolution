'use client'
import { useEditObject } from '@/hooks/useEditObject'
import React from 'react'

type Props = {}

const ObjectSummary = (props: Props) => {
    const objectRef: any = useEditObject()
    return (
        <div className='text-xs'>
            <div className='flex gap-1'>
                <p>
                    Properties:
                </p>
                <p>
                    {
                        objectRef?.object.property?.length || 0
                    }
                </p>
            </div>
        </div>
    )
}

export default ObjectSummary
'use client'
import { useCreateObject } from '@/hooks/useCreateObjectForm'
import React from 'react'

type Props = {}

const ObjectSummary = (props: Props) => {
    const objectRef: any = useCreateObject()

    return (
        <div className='text-xs'>
            <div className='flex gap-1'>
                <p>
                    Properties:
                </p>
                <p>
                    {
                        objectRef.properties.length
                    }
                </p>
            </div>
        </div>
    )
}

export default ObjectSummary
'use client'
import { ComboBoxSelect } from '@/components/ComboBox/ComboBoxSelect'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
    CheckCircle2,
    HelpCircle,
} from "lucide-react"

type Props = {}

export default function HeaderControls({ props }: any) {
    const [isMounted, setIsMounted] = React.useState(false)
    const [object, setObject] = useState(props.object)
    
    const objectTypeOptions = [
        {
            value: "FIXED",
            label: "Fixed",
            icon: CheckCircle2,
        },
        {
            value: "VARIANT",
            label: "Variant",
            icon: HelpCircle,
        },
    ]
    const categoryOptions = props.availableCategories;


    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        isMounted && (<div className='flex flex-row gap-2'>
            <section className='flex items-center gap-2'>
                <p className='text-sm font-semibold '>
                    Name:
                </p>
                <Input disabled={props.isDoing} placeholder='Enter product name' onChange={(e): any => props.setName(e.target.value)} value={props.name} />
            </section>
            <section className='flex items-center gap-2'>
                <p className='text-sm font-semibold '>
                    Description:
                </p>
                <Input disabled={props.isDoing} placeholder='Description' onChange={(e): any => props.setDescription(e.target.value)} value={props.description} />
            </section>
            <section className='flex items-center gap-2'>
                <ComboBoxSelect key={1} disabled={props.isDoing} title='Object type:' prompt='Search object types, Default: FIXED' setValue={props.setObjectType} value={props.objectType} defaultValue={props.objectType} options={objectTypeOptions} />
            </section>
            <section className='flex items-center gap-2'>
                <ComboBoxSelect key={2} disabled={props.isDoing} title='Category:' prompt='Search category' setValue={props.setSelectedCategory} value={props.value} options={categoryOptions} defaultValue={props.value} />
            </section>
        </div>)
    )
}
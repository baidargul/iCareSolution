'use client'
import { ComboBox_SelectCategoryType } from '@/app/(main)/(routes)/purchases/(routes)/create/components/ComboBox_SelectCategoryType'
import { Input } from '@/components/ui/input'
import React from 'react'

type Props = {}

export default function HeaderControls({ }: Props) {
    const [categoryType, setCategoryType] = React.useState('' as string)
    return (
        <div className='flex flex-row gap-2'>
            <section className='flex items-center gap-2'>
                <p className='text-sm font-semibold '>
                    Name:
                </p>
                <Input placeholder='Enter product name' />
            </section>
            <section className='flex items-center gap-2'>
                <p className='text-sm font-semibold '>
                    Description:
                </p>
                <Input placeholder='Description' />
            </section>
            <section className='flex items-center gap-2'>
                <ComboBox_SelectCategoryType setCategoryType={setCategoryType} />
            </section>
        </div>
    )
}
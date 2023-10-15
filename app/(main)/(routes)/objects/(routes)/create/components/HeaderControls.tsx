'use client'
import { ComboBox_SelectCategoryType } from '@/app/(main)/(routes)/purchases/(routes)/create/components/ComboBox_SelectCategoryType'
import { Input } from '@/components/ui/input'
import React from 'react'

type Props = {}

export default function HeaderControls({ props }: any) {
    return (
        <div className='flex flex-row gap-2'>
            <section className='flex items-center gap-2'>
                <p className='text-sm font-semibold '>
                    Name:
                </p>
                <Input placeholder='Enter product name' onChange={(e): any => props.setName(e.target.value)} value={props.name} />
            </section>
            <section className='flex items-center gap-2'>
                <p className='text-sm font-semibold '>
                    Description:
                </p>
                <Input placeholder='Description' onChange={(e): any => props.setDescription(e.target.value)} value={props.description} />
            </section>
            <section className='flex items-center gap-2'>
                <ComboBox_SelectCategoryType setCategoryType={props.setCategory} />
            </section>
        </div>
    )
}
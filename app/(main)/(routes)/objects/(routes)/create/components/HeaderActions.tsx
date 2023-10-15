'use client'
import React from 'react'
import { Save, Trash } from "lucide-react"

type Props = {}

export default function HeaderActions({ }: Props) {
    return (
        <div className='flex'>
            <button className='bg-theme-ButtonPrimary rounded-md p-2 flex gap-2 items-center'>
                <Save className='w-4 h-4' />
                <p className='text-sm font-semibold'>
                    Save
                </p>
            </button>
            <button className='bg-theme-ButtonSecondary rounded-md p-2 flex gap-2 items-center'>
                <Trash className='w-4 h-4' />
                <p className='text-sm font-semibold'>
                    Delete
                </p>
            </button>
        </div>
    )
}
'use client'
import React from 'react'
import { Save, Trash } from "lucide-react"

export default function HeaderActions({ props }: any) {
    return (
        <div className='flex'>
            <button onClick={props.DoSave} className='bg-theme-ButtonPrimary rounded-md p-2 flex gap-2 items-center'>
                <Save className='w-4 h-4' />
                <p className='text-sm font-semibold'>
                    Save
                </p>
            </button>
            <button onClick={props.DoDelete} className='bg-theme-ButtonSecondary rounded-md p-2 flex gap-2 items-center'>
                <Trash className='w-4 h-4' />
                <p className='text-sm font-semibold'>
                    Delete
                </p>
            </button>
        </div>
    )
}
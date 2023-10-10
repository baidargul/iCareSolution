'use client'

import {
    Dialog,
    DialogTitle,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogFooter,
} from '@/components/ui/dialog'

import { useEffect, useState } from 'react';

const InitialModal = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        isMounted &&
        (
            <Dialog open>
                <DialogContent className='bg-white text-black p-0 overflow-hidden'>
                    <DialogHeader className='py-8 px-6'>
                        <DialogTitle className='text-2xl font-bold'>Welcome to the app!</DialogTitle>
                        <DialogDescription className='text-sm'>
                            We're so excited to have you here! Let's get started by setting up your profile.
                        </DialogDescription>
                    </DialogHeader>

                </DialogContent>
            </Dialog>
        )
    );
}

export default InitialModal;
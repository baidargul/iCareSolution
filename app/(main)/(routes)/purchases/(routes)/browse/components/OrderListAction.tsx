'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import { purchase } from '@prisma/client'
import { useState, useEffect } from 'react'

type Props = {
    orders: any
}

export const OrderListAction = (props: Props) => {
    const [orders, setOrders] = useState(props.orders)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
    }, [isMounted])

    return (
        <ScrollArea>
            {
                orders && isMounted && <div className="flex flex-col justify-start">
                    {
                        orders.map((order: purchase) => {
                            return (
                                <div key={order.purchaseId} className='flex justify-between items-center cursor-pointer hover:bg-theme-Primary/10 p-2'>
                                    <div className='font-semibold '>
                                        {
                                            order.purchaseId
                                        }
                                    </div>
                                    <div className='tracking-tighter text-xs'>
                                        {
                                            order.dateOfPurchase.toDateString() + ' ' + order.dateOfPurchase.toLocaleTimeString()
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
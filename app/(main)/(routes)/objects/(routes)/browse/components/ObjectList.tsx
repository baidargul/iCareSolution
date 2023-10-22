import React from 'react'
import { prisma } from "@/lib/prisma-db";
import ObjectListAction from './ObjectListAction';

type Props = {}

async function ObjectList({ }: Props) {
    const tempObjects: any = await prisma.objects.findMany({
        include: {
            categories: true,
            property: {
                include: {
                    propertyValues: true
                }
            },
        },
        orderBy: [
            {
                name: 'desc'
            }
        ]
    });
    return (
        <div>
            <ObjectListAction objects={tempObjects} />
        </div>
    )
}

export default ObjectList
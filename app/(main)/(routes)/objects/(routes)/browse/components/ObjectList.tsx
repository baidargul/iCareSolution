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
                    propertyValues: {
                        select: {
                            id: true,
                            propertyId: true,
                            name: true,
                            description: true,
                            index: true
                        },
                        orderBy: {
                            index: 'asc'
                        }
                    }
                },
                orderBy: {
                    index: 'asc'
                }
            },
        },
        orderBy: [
            {
                name: 'asc'
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
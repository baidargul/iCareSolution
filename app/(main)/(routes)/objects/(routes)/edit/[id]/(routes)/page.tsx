import React from 'react'
import { PropertiesContainer } from '../components/propertiesContainer'
import ObjectSummary from '../components/ObjectSummary'
import { PropertyTypes } from '@prisma/client'

interface Props {
    params: {
        id: string
    }
}

type propertyValues = {
    id: string,
    name: string;
    description: string;
    index: number;
    propertId: string;
    isDefault?: boolean;
}

type property = {
    id: string,
    name: string;
    description: string;
    type: PropertyTypes;
    propertyValues: propertyValues[];
    index: number | null;
    objectId: string;
};

type Object = {
    categories: {
        id: string,
        name: string;
    },
    categoryId: string,
    dateCreated: Date | null;
    id: string,
    name: string;
    description: string;
    type: PropertyTypes;
    property: property[];
}

const EditObject = async (props: Props) => {
    const objectId = props.params.id



    return (
        <div className=" p-2 w-full grid grid-rows-2 gap-2">
            <div className="p-2 bg-white rounded-md border border-zinc-500 drop-shadow-md">
                <PropertiesContainer />
            </div>
            <div className="p-2 bg-white rounded-md border h-[110px] border-zinc-500 drop-shadow-md">
                <ObjectSummary />
            </div>
        </div>
    )
}

export default EditObject
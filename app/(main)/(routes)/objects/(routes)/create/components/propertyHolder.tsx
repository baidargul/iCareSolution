import { PropertyTypes } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Trash, ArrowBigDown, ArrowUp, ArrowDown } from 'lucide-react';
import ToolTipProvider from '@/components/ToolTip/ToolTipProvider';
import { Input } from '@/components/ui/input';
import { ComboBoxSelect } from '@/components/ComboBox/ComboBoxSelect';
import { useCreateObject } from '@/hooks/useCreateObjectForm';

type propertyValues = {
    name: string;
    description: string;
    index: number;
    isDefault: boolean;
}

type property = {
    id: string,
    name: string;
    description: string;
    type: PropertyTypes;
    values: propertyValues[];
    index: number;
};

type Props = {
    property: property
}

const PropertyHolder = (props: Props) => {
    const property = props.property
    const [selectedProperty, setSelectedProperty] = useState<string>(property.type)
    const objectRef: any = useCreateObject();

    useEffect(() => {
        objectRef.updatePropertyType(property.id, selectedProperty)
    }, [selectedProperty])

    const propertyTypes = [
        {
            value: "TEXT",
            label: "Text"
        },
        {
            value: "SELECTSINGLE",
            label: "Single Selection"
        },
        {
            value: "SELECTMULTIPLE",
            label: "Multiple Selection"
        },
        {
            value: "BOOLEAN",
            label: "Boolean"
        },
    ]


    return (
        <div className='p-2 bg-theme-Slate rounded border border-theme-Primary/30'>
            <div className='flex justify-between items-center gap-4'>
                <div className='w-full flex flex-col gap-2'>
                    {/* <ToolTipProvider value={`Position: ${property.index}`}>
                        <div className='text-xs bg-theme-Primary/10 px-2 font-semibold p-1 rounded-md w-fit'>
                            {property.index}
                        </div>
                    </ToolTipProvider> */}
                    <div className='flex gap-2'>
                        <section className='flex items-center gap-2'>
                            <div className='font-semibold' >
                                Name:
                            </div>
                            <Input placeholder={`Property #${property.index}`} onChange={(e: any) => { objectRef.changePropertyName(property.id, e.target.value) }} />
                        </section>
                        <section className='flex items-center gap-2'>
                            <div className='font-semibold' >
                                Description:
                            </div>
                            <Input placeholder={property.description} onChange={(e: any) => { objectRef.changePropertyDescription(property.id, e.target.value) }} />
                        </section>
                        <section className='flex items-center gap-2'>
                            <ComboBoxSelect defaultValue={property.name} title={`Type:`} prompt='Search property types' options={propertyTypes} setValue={setSelectedProperty} />
                        </section>
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-fit'>
                    <ToolTipProvider value='Move up'>
                        <div onClick={() => objectRef.movePropertyIndexUp(property.id, property.index)} className='cursor-pointer flex items-center justify-center w-6 h-6 bg-blue-100/30 border-2 border-blue-800 p-1 rounded-full'>
                            <ArrowUp className='w-4 h-4  text-blue-800  hover:scale-75 transition-all ' />
                        </div>
                    </ToolTipProvider>
                    <ToolTipProvider value='Move down'>
                        <div onClick={() => objectRef.movePropertyIndexDown(property.id, property.index)} className='cursor-pointer flex items-center justify-center w-6 h-6 bg-blue-100/30 border-2 border-blue-800 p-1 rounded-full'>
                            <ArrowDown className='w-4 h-4  text-blue-800  hover:scale-75 transition-all ' />
                        </div>
                    </ToolTipProvider>
                    <ToolTipProvider value='Remove Property'>
                        <div onClick={() => objectRef.removeProperty(property.id)} className='cursor-pointer flex items-center justify-center w-6 h-6 bg-red-500/80 border-2 border-red-500 p-1 rounded-full'>
                            <Trash className='w-4 h-4  text-white  hover:scale-75 transition-all ' />
                        </div>
                    </ToolTipProvider>
                </div>
            </div>
        </div>
    )
}

export default PropertyHolder
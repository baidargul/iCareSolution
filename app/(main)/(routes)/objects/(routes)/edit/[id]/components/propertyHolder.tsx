import { PropertyTypes } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Trash, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Check, CheckCheck, TextCursorInput, Binary, Info } from 'lucide-react';
import ToolTipProvider from '@/components/ToolTip/ToolTipProvider';
import { Input } from '@/components/ui/input';
import { ComboBoxSelect } from '@/components/ComboBox/ComboBoxSelect';
import { Button } from '@/components/ui/button';
import { useEditObject } from '@/hooks/useEditObject';

type propertyValues = {
    id: string,
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
    propertyValues: propertyValues[];
    index: number;
};

type Props = {
    property: property
}

const PropertyHolder = (props: Props) => {
    const [property, setProperty] = useState<property>(props.property)
    const [selectedProperty, setSelectedProperty] = useState<string>(property.type)
    const [currentValue, setCurrentValue] = useState<string>('')
    const [isHover, setIsHover] = useState<string>('')
    const objectRef: any = useEditObject();

    useEffect(() => {
        setProperty(props.property)
    }, [props.property])

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
                    <ToolTipProvider value={`Priority: ${property.index || 0}`}>
                        <div className='text-xs flex gap-1 items-center font-semibold opacity-30 rounded-md w-fit'>
                            <p>
                                {GetPropertyIcon(property)}
                            </p>
                            <p>
                                Property {property.index || 0}
                            </p>
                        </div>
                    </ToolTipProvider>
                    <div className='flex gap-2'>
                        <section className='flex items-center gap-2'>
                            <div className='font-semibold' >
                                Name:
                            </div>
                            <Input placeholder={`Property #${property.index || 0}`} onChange={(e: any) => { objectRef.changePropertyName(property.id, e.target.value) }} value={property.name} />
                        </section>
                        <section className='flex items-center gap-2'>
                            <div className='font-semibold' >
                                Description:
                            </div>
                            <Input value={property.description} onChange={(e: any) => { objectRef.changePropertyDescription(property.id, e.target.value) }} />
                        </section>
                        <section className='flex items-center gap-2'>
                            <ComboBoxSelect defaultValue={GetPropertyDescription(property)} title={`Type:`} prompt='Search property types' options={propertyTypes} setValue={setSelectedProperty} value={property.description} />
                        </section>
                        <section className='flex items-center gap-2'>
                            {
                                GetPropertyPanel(property, currentValue, setCurrentValue, objectRef)
                            }
                        </section>
                    </div>
                    {
                        objectRef.object && GetPropertyValues(property, objectRef, isHover, setIsHover)
                    }
                </div>
                <div className='flex flex-col gap-1 w-fit'>
                    <ToolTipProvider value='Move up'>
                        <div onClick={() => objectRef.movePropertyIndexUp(property.id, property.index)} className={`${property.index === 1 ? "invisible" : "visible"} cursor-pointer flex items-center justify-center w-6 h-6 bg-blue-100/30 border-2 border-blue-800 p-1 rounded-full`}>
                            <ArrowUp className='w-4 h-4  text-blue-800  hover:scale-75 transition-all ' />
                        </div>
                    </ToolTipProvider>
                    <ToolTipProvider value='Move down'>
                        <div onClick={() => objectRef.movePropertyIndexDown(property.id, property.index)} className={`${property.index === objectRef.object.property.length ? "hidden" : "block"} cursor-pointer flex items-center justify-center w-6 h-6 bg-blue-100/30 border-2 border-blue-800 p-1 rounded-full`}>
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



function GetPropertyPanel(property: property, currentValue: string, setCurrentValue: any, objectRef: any) {

    function handleAddValue() {
        if (currentValue === '') return
        objectRef.addValueToProperty(property.id, currentValue, "")
        setCurrentValue('')
    }

    function handleTextValue(value: string) {
        setCurrentValue(value)
        // const valueId = objectRef.object.property.values[0]?.id
        const valueId = property.propertyValues[0]?.id
        if (valueId) {
            objectRef.updatePropertyValue(objectRef.object.id, valueId, value)
        } else {
            //Loop to check if the value exists, if yes then remove it 
            property.propertyValues.forEach((value: any) => {
                if (value.name.toLocaleUpperCase() === currentValue.toLocaleUpperCase()) {
                    objectRef.removeValueFromProperty(property.id, value.id)
                }
            })

            objectRef.addValueToProperty(property.id, value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase(), "")
        }

        setCurrentValue('')
    }

    const inputOptions = [
        {
            value: 'TEXT',
            label: 'Text'
        },
        {
            value: 'NUMBER',
            label: 'Number'
        },
        {
            value: 'DATE',
            label: 'Date'
        },
        {
            value: 'TIME',
            label: 'Time'
        },
        {
            value: 'DATETIME',
            label: 'Date & Time'
        },
        {
            value: 'EMAIL',
            label: 'Email'
        },
        {
            value: 'PHONE',
            label: 'Phone'
        },
        {
            value: 'URL',
            label: 'URL'
        },
    ]

    switch (property.type) {
        case "TEXT":
            const type = property.propertyValues[0]?.name || 'TEXT'
            return (
                <>
                    <div className='flex items-center gap-2'>
                        <ComboBoxSelect title='Format:' options={inputOptions} prompt='Input types' setValue={handleTextValue} defaultValue={type} />
                    </div>
                </>
            )
        case 'SELECTSINGLE':
            return (
                <>
                    <div className='flex items-center gap-2'>
                        <div className='font-semibold' >
                            Values:
                        </div>
                        <Input placeholder='Option' title='Values' onChange={(e: any) => { setCurrentValue(e.target.value) }} onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" ? handleAddValue() : null} value={currentValue} />
                        <Button title='Add' variant={'ghost'} onClick={() => handleAddValue()} >Add</Button>
                    </div>
                </>
            )

        case 'SELECTMULTIPLE':
            return (
                <>
                    <div className='flex items-center gap-2'>
                        <div className='font-semibold' >
                            Values:
                        </div>
                        <Input placeholder='Option' title='Values' onChange={(e: any) => { setCurrentValue(e.target.value) }} onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" ? handleAddValue() : null} value={currentValue} />
                        <Button title='Add' variant={'ghost'} onClick={() => handleAddValue()} >Add</Button>
                    </div>
                </>
            )


        case 'BOOLEAN':
            return (
                <ToolTipProvider value='Yes/No'>
                    <div className='text-xs text-blue-800 flex gap-1 items-center w-fit'>
                        <Info className='w-4 h-4' />
                        <p>
                            Boolean
                        </p>
                    </div>
                </ToolTipProvider>
            )

        default:
            break;
    }
}

function GetPropertyValues(property: property, objectRef: any, isHover: any, setIsHover: any) {
    function handleRemoveEvent(propertyId: string, id: string) {
        objectRef.removeValueFromProperty(propertyId, id)
    }
    switch (property.type) {
        case "TEXT":
            break;

        case 'SELECTSINGLE':
            return (
                <div className='w-full border-2 border-theme-Primary/30  border-dashed rounded p-2'>
                    <div className='grid grid-cols-6 gap-2 justify-items-center'>
                        {
                            property.propertyValues.map((value, index) => {
                                return (
                                    <button className='relative ' key={index} onClick={() => setIsHover(value.id)} onBlur={() => setIsHover('')} onKeyDown={(e) => e.key === "Enter" || e.key === "Escape" ? setIsHover('') : null}>
                                        <ToolTipProvider value={`${value.name}`}>
                                            <div className='w-36 bg-theme-Secondry/70 p-1 text-center text-black hover:bg-theme-Secondry/50 whitespace-nowrap overflow-hidden text-ellipsis  cursor-pointer transition-all rounded '>
                                                {value.name}
                                            </div>
                                        </ToolTipProvider>
                                        <div className={`p-2  ${isHover === value.id ? "block" : "hidden"} justify-center items-center  mt-1 rounded-md drop-shadow-sm border-slate-400 border absolute bg-theme-Slate w-full`}>
                                            <div className='text-sm font-semibold'>
                                                Actions
                                            </div>
                                            <section className='flex justify-evenly items-center gap-2 bg-theme-Slate'>
                                                <div className='border-2 text-theme-BlackPointer/80 rounded-md w-fit p-1 mt-2'>
                                                    <ToolTipProvider value={`Remove`}>
                                                        <Trash onClick={() => { handleRemoveEvent(property.id, value.id) }} className=' text-theme-BlackPointer/80' />
                                                    </ToolTipProvider>
                                                </div>
                                                <div className={`${value.index === 1 ? "hidden" : "block"} border-2 text-theme-BlackPointer/80 rounded-md w-fit p-1 mt-2`}>
                                                    <ToolTipProvider value={`Shift Left`}>
                                                        <ArrowLeft onClick={() => { setIsHover(false); objectRef.movePropertyValueIndexUp(property.id, value.id, value.index); }} className=' text-theme-BlackPointer/80' />
                                                    </ToolTipProvider>
                                                </div>
                                                <div className={`${value.index === property.propertyValues.length ? "hidden" : "block"} border-2 text-theme-BlackPointer/80 rounded-md w-fit p-1 mt-2`}>
                                                    <ToolTipProvider value={`Shift Right`}>
                                                        <ArrowRight onClick={() => { setIsHover(false); objectRef.movePropertyValueIndexDown(property.id, value.id, value.index); }} className=' text-theme-BlackPointer/80' />
                                                    </ToolTipProvider>
                                                </div>
                                            </section>
                                        </div>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            )
        case 'SELECTMULTIPLE':
            return (
                <div className='w-full border-2 border-theme-Primary/30  border-dashed rounded p-2'>
                    <div className='grid grid-cols-6 gap-2 justify-items-center'>
                        {
                            property.propertyValues.map((value, index) => {
                                return (
                                    <button className='relative z-2' key={index} onClick={() => setIsHover(value.id)} onBlur={() => setIsHover('')} onKeyDown={(e) => e.key === "Enter" || e.key === "Escape" ? setIsHover('') : null}>
                                        <ToolTipProvider value={`${value.name}`}>
                                            <div className='w-36 bg-theme-Secondry/70 p-1 text-center text-black hover:bg-theme-Secondry/50 whitespace-nowrap overflow-hidden text-ellipsis  cursor-pointer transition-all rounded '>
                                                {value.name}
                                            </div>
                                        </ToolTipProvider>
                                        <div className={`p-2  ${isHover === value.id ? "block" : "hidden"} justify-center items-center  mt-1 rounded-md drop-shadow-sm border-slate-400 border absolute bg-theme-Slate w-full`}>
                                            <div className='text-sm font-semibold'>
                                                Actions
                                            </div>
                                            <section className='flex justify-evenly items-center gap-2'>
                                                <div className='border-2 text-theme-BlackPointer/80 rounded-md w-fit p-1 mt-2'>
                                                    <ToolTipProvider value={`Remove`}>
                                                        <Trash onClick={() => { handleRemoveEvent(property.id, value.id) }} className=' text-theme-BlackPointer/80' />
                                                    </ToolTipProvider>
                                                </div>
                                                <div className={`${value.index === 1 ? "hidden" : "block"} border-2 text-theme-BlackPointer/80 rounded-md w-fit p-1 mt-2`}>
                                                    <ToolTipProvider value={`Shift Left`}>
                                                        <ArrowLeft onClick={() => { setIsHover(false); objectRef.movePropertyValueIndexUp(property.id, value.id, value.index); }} className=' text-theme-BlackPointer/80' />
                                                    </ToolTipProvider>
                                                </div>
                                                <div className={`${value.index === property.propertyValues.length ? "hidden" : "block"} border-2 text-theme-BlackPointer/80 rounded-md w-fit p-1 mt-2`}>
                                                    <ToolTipProvider value={`Shift Right`}>
                                                        <ArrowRight onClick={() => { setIsHover(false); objectRef.movePropertyValueIndexDown(property.id, value.id, value.index); }} className=' text-theme-BlackPointer/80' />
                                                    </ToolTipProvider>
                                                </div>
                                            </section>
                                        </div>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            )

        default:
            break;
    }
}

function GetPropertyIcon(property: property) {
    switch (property.type) {
        case "TEXT":
            return (
                <TextCursorInput />
            )
        case "SELECTSINGLE":
            return (
                <Check />
            )

        case "SELECTMULTIPLE":
            return (
                <CheckCheck />
            )
        case 'BOOLEAN':
            return (
                <Binary />
            )
        default:
            break;
    }
}

function GetPropertyDescription(property: property) {
    switch (property.type) {
        case "TEXT":
            return ("Text")
        case "BOOLEAN":
            return ("Boolean")
        case "SELECTSINGLE":
            return ("Single Selection")
        case "SELECTMULTIPLE":
            return ("Multiple Selection")
    }

}
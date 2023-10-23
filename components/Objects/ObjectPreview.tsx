'use client'
import {
    CheckCircle2,
    HelpCircle,
} from "lucide-react"
import { useBrowseObject } from '@/hooks/useBrowseObject'
import React from 'react'
import ToolTipProvider from "../ToolTip/ToolTipProvider"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { ComboBoxSelect } from "../ComboBox/ComboBoxSelect"

type Props = {
    object?: any
}

const ObjectPreview = (props: Props) => {
    const objectRef: any = useBrowseObject()
    const object = props.object ? props.object : objectRef.object

    console.log(object)

    function getObjectType(object: any) {
        switch (object.type) {
            case "FIXED":
                return (
                    <CheckCircle2 className="text-xs" />
                )

            case "VARIANT":
                return (
                    <HelpCircle className="text-xs" />
                )
        }
    }

    return (
        object ? (<div className={`select-none ${object.name ? "" : "hidden"}`}>
            <div className='bg-theme-Slate p-2 rounded-md drop-shadow-sm border border-theme-Primary/20'>
                <div className='flex gap-2 '>
                    <div className='tracking-wider text-sm font-semibold flex gap-1 items-center'>
                        <ToolTipProvider value={object.type}>
                            <div className="bg-theme-Primary/10 p-1 rounded-full text-theme-Primary w-6 h-6 flex justify-center items-center transition-all hover:scale-110 hover:drop-shadow-sm">
                                {
                                    getObjectType(object)
                                }
                            </div>
                        </ToolTipProvider>
                        <p>
                            {object.name}
                        </p>
                    </div>
                    <div className='tracking-wider text-xs font-semibold flex items-center border-b-2 border-theme-Primary/40 cursor-pointer hover:border-t-2 transition-all hover:border-b-0'>
                        in {object?.categories?.name}
                    </div>
                </div>
                <div className="text-xs ml-7 leading-tight mt-1">
                    {
                        object.description
                    }
                </div>
                <div className="mt-1 mb-5">
                    <Separator />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {
                        object?.property?.map((property: any) => {

                            return (
                                <section key={property.id} className="">
                                    <div className="grid grid-cols-2 gap-2 justify-items-start">
                                        <div className="text-sm font-semibold leading-tight">
                                            {property.name}:
                                        </div>
                                        <div className="w-full flex flex-col justify-center">
                                            {getPropertyTypeControl(property)}
                                        </div>
                                    </div>
                                </section>
                            )
                        })
                    }
                </div>
                <div>

                </div>
            </div>
        </div >) : null
    )
}

export default ObjectPreview

function getPropertyTypeControl(property: any) {
    let propertyType: string = ""

    switch (property.type) {
        case "TEXT":
            propertyType = property?.propertyValues[property?.propertyValues?.length - 1].name
            return (
                <div>
                    <Input className="h-6" placeholder={property.description} type={propertyType} />
                </div>
            )
        case "SELECTSINGLE":
            return (
                <select className="border border-slate-200 drop-shadow-sm w-full rounded-md outline-none focus:outline-theme-Primary/30">
                    {
                        property?.propertyValues?.map((propertyValue: any) => {
                            return (
                                <option className="bg-theme-Primary/5" key={propertyValue.id} value={propertyValue.name}>{propertyValue.name}</option>
                            )
                        })
                    }
                </select>
            )
        case "SELECTMULTIPLE":
            return (
                <section>
                    {
                        property?.propertyValues?.map((propertyValue: any) => {
                            return (
                                <div key={propertyValue.id} className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    <label>{propertyValue.name}</label>
                                </div>
                            )
                        })
                    }
                </section>

            )

        case "BOOLEAN":
            return (
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="scale-125" />
                </div>
            )
    }

}
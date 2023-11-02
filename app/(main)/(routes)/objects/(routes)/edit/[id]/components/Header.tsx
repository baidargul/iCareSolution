'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import HeaderControls from './HeaderControls'
import HeaderActions from './HeaderActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useEditObject } from '@/hooks/useEditObject'
type Props = {
    editObjectId?: string | undefined
    availableCategories: any
    editObject?: any
}

const ObjectEditHeader = (props: Props) => {
    const [object, setObject] = React.useState({} as any)
    const [isDoing, setIsDoing] = React.useState(false)
    const [id, setId] = React.useState(props.editObject?.id || '' as string)
    const [name, setName] = React.useState(props.editObject?.name || '')
    const [description, setDescription] = React.useState(props.editObject?.description || '')
    const [objectType, setObjectType] = React.useState(GetObjectType(props.editObject) as string)
    const [selectedCategory, setSelectedCategory] = React.useState(props.editObject?.categories.name || '' as string)
    const objectRef: any = useEditObject()

    useEffect(() => {
        // console.log(`Got Prop: `, props.editObject)
        objectRef.object = props.editObject
    }, [props.editObject])

    useEffect(() => {
        console.log(`objectRef changed to: `, objectRef.object)
        setObject(props.editObject)
    }, [objectRef.object])

    useEffect(() => {
        // console.log(`Object is changed to: `, object)
    }, [object])


    const router = useRouter()

    useEffect(() => {
        objectRef.setObjectValues(name, description, objectType, selectedCategory)
    }, [name, description, objectType, selectedCategory])

    function resetAll() {
        setIsDoing(false)
        setId('')
        setName('')
        setDescription('')
        object.clearProperties()
        object.clearObject()
    }


    const DoSave = async () => {
        setIsDoing(true)
        const targetObject = objectRef.object
        const targetProperties = objectRef.object.property

        console.log(targetObject)
        // const targetObject = object.object
        // const targetProperties = object.properties

        if (targetObject.name.length < 1) {
            setIsDoing(false)
            toast.error(`Warning!`, { description: "Please enter a name for the object" })
            return
        }


        if (targetObject.type.length < 1) {
            setIsDoing(false)
            toast.error(`Warning!`, { description: "Please select an object type" })
            return
        }

        if (targetObject.categories.length < 1) {
            setIsDoing(false)
            toast.error(`Warning!`, { description: "Please select an object category" })
            return
        }

        if (targetProperties.length < 1) {
            setIsDoing(false)
            toast.error(`Warning!`, { description: "Please add at least one property" })
            return
        }

        const product = {
            ...targetObject
        }

        console.log(`Product: `, product)

        await axios.patch('/api/objects', { ...product }).then((res) => {
            const data = res.data;
            if (data.status != 200) {
                toast.error(`Error!`, { description: data.message })
                return
            } else {
                toast.success(`Success!`, { description: data.message })
                resetAll()
                router.refresh()
            }
        })

        // console.log(objectRef.object)

        setIsDoing(false)
    }

    const DoDelete = async () => {
        setIsDoing(true)
        const object = {
            name,
            description,
            objectType,
            category: selectedCategory,
        }
        console.log(object)
        setIsDoing(false)
    }

    const propForwarder = {
        name, setName, description, setDescription, value: selectedCategory, objectType, objectRef, setObjectType, id, setId, availableCategories: props.availableCategories, setSelectedCategory, isDoing, DoSave, DoDelete,
    }


    return (
        <div className='bg-theme-Slate p-4 drop-shadow-sm z-50'>
            <div className='flex gap-2 text-lg font-semibold mb-2 items-center'>
                <Pencil className='w-4 h-4' />
                <div className='flex gap-2'>
                    <div>
                        {
                            `Edit Object ${object.name} `
                        }
                    </div>
                    <div className='border-b-2 border-theme-Primary hover:border-b-0 hover:border-t-2 transition-all'>
                        {
                            `in ${props.editObject.categories.name}`
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <section className='text-lg flex flex-row gap-2 items-center'>
                    <HeaderControls props={{ ...propForwarder }} />
                </section>
                <section>
                    <HeaderActions props={{ ...propForwarder }} />
                </section>
            </div>
        </div>
    )
}

export default ObjectEditHeader

function GetObjectType(object: any) {
    if (object.type === "FIXED") return "Fixed"
    if (object.type === "VARIANT") return "Variant"
}
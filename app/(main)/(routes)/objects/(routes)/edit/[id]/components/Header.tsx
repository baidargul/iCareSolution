'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import HeaderControls from './HeaderControls'
import HeaderActions from './HeaderActions'
import { useCreateObject } from '@/hooks/useCreateObjectForm'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
type Props = {
    editObjectId?: string | undefined
    availableCategories: any
    editObject?: any
}

const ObjectEditHeader = (props: Props) => {
    const [isDoing, setIsDoing] = React.useState(false)
    const [id, setId] = React.useState(props.editObject?.id || '' as string)
    const [name, setName] = React.useState(props.editObject?.name || '')
    const [description, setDescription] = React.useState(props.editObject?.description || '')
    const [objectType, setObjectType] = React.useState(GetObjectType(props.editObject) as string)
    const [selectedCategory, setSelectedCategory] = React.useState(props.editObject?.categories.name || '' as string)
    const object: any = props.editObject
    // const object: any = useCreateObject()
    const router = useRouter()

    useEffect(() => {
        // object.setObjectValues(id, name, description, objectType, selectedCategory)
    }, [id, name, description, objectType, selectedCategory])

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
        const targetObject = object.object
        const targetProperties = object.properties

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

        if (targetObject.category.length < 1) {
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
            name,
            description,
            objectType,
            category: selectedCategory,
            properties: targetProperties
        }

        await axios.post('/api/objects', { ...product }).then((res) => {
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
        name, setName, description, setDescription, value: selectedCategory, objectType, object, setObjectType, id, setId, availableCategories: props.availableCategories, setSelectedCategory, isDoing, DoSave, DoDelete,
    }


    return (
        <div className='bg-theme-Slate p-4 drop-shadow-sm z-50'>
            <div className='flex gap-2 text-lg font-semibold mb-2 items-center'>
                <Pencil className='w-4 h-4' />
                <p>
                    {
                        props.editObjectId ? `Edit Object ${props.editObject.name} in ${props.editObject.categories.name}` : `Unknown object`
                    }
                </p>
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
    if(object.type==="FIXED") return "Fixed"
    if(object.type==="VARIANT") return "Variant"
}
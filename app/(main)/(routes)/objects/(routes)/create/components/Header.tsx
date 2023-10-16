'use client'
import React from 'react'
import axios from 'axios'
import RouteBackButton from './RouteBackButton'
import HeaderControls from './HeaderControls'
import HeaderActions from './HeaderActions'

type Props = {
    newObjectIndex?: number | undefined
    availableCategories: any
}

const ObjectCreateHeader = (props: Props) => {
    const [isDoing, setIsDoing] = React.useState(false)
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [objectType, setObjectType] = React.useState('FIXED' as string)
    const [selectedCategory, setSelectedCategory] = React.useState('' as string)

    const DoSave = async () => {
        setIsDoing(true)
        const object = {
            name,
            description,
            objectType,
            category: selectedCategory,
        }

        const res = await axios.post('/api/objects', { ...object }).then((res) => {
            const data = res.data;
            console.log(data);
        })

        console.log('object', object)
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
        name, setName, description, setDescription, objectType, setObjectType, availableCategories: props.availableCategories, setSelectedCategory, isDoing, DoSave, DoDelete
    }


    return (
        <div className='bg-theme-Slate p-4 drop-shadow-sm'>
            <div className='flex gap-2 text-lg font-semibold mb-2'>
                <RouteBackButton />
                <p>
                    {
                        props.newObjectIndex ? `New Object ${props.newObjectIndex}` : `Create Object`
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

export default ObjectCreateHeader
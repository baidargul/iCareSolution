import React from 'react'
import { PropertiesContainer } from '../components/propertiesContainer'
import ObjectSummary from '../components/ObjectSummary'

interface Props {
    params: {
        id: string
    }
}

const EditObject = (props: Props) => {
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
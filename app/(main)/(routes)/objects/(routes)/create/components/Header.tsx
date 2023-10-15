import React from 'react'
import RouteBackButton from './RouteBackButton'
import HeaderControls from './HeaderControls'
import HeaderActions from './HeaderActions'

type Props = {}

const ObjectCreateHeader = (props: Props) => {
    return (
        <div className='bg-theme-Slate p-4 drop-shadow-sm'>
            <div className='flex gap-2 text-lg font-semibold mb-2'>
                <RouteBackButton />
                <p>
                    Create Object
                </p>
            </div>
            <div className='flex flex-row justify-between'>
                <section className='text-lg flex flex-row gap-2 items-center'>
                    <HeaderControls />
                </section>
                <section>
                    <HeaderActions/>
                </section>
            </div>
        </div>
    )
}

export default ObjectCreateHeader
import React, { Children } from 'react'
import ObjectBrowseHeader from './components/Header'
import ObjectBrowseFooter from './components/Footer'

type Props = {

}

function ObjectBrowseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-h-screen bg-theme-BlackPointer/70 p-2">
            <ObjectBrowseHeader />
            <div className=" bg-theme-Slate h-[600px] p-2">
                {
                    children
                }
            </div>

            <ObjectBrowseFooter/>
        </div>
    )
}

export default ObjectBrowseLayout
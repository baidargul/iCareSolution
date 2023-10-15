'use client'

import { useRouter } from "next/navigation";

const ObjectsBrowsePage = () => {
    const router = useRouter()
    return (
        <div>
            List of all avaialble objects
            <button className="bg-theme-Primary text-white p-2 rounded" onClick={() => router.push("/objects/create")}>
                Create
            </button>
        </div>
    );
}

export default ObjectsBrowsePage;
import ObjectPreview from "@/components/Objects/ObjectPreview";
import ObjectList from "../components/ObjectList";
import { InfoIcon } from "lucide-react"

const ObjectsBrowsePage = () => {
    return (
        <div className="">
            <div className="font-semibold text-xl text-theme-BlackPointer -mt-2">
                Browse Objects
            </div>
            <p className="mb-4 text-sm text-black/80 flex gap-2">
                Objects are just like any other object in the real world. They have properties, and they can be categorized. You can create as many objects as you want, and you can use them in this application to define product's nature. Once nature/object is defined, create a new product and assign it to the object you want.
            </p>
            <div className="flex justify-between items-center gap-2">
                <div className="bg-white border border-slate-300 rounded p-2 h-[515px] w-72">
                    <ObjectList />
                </div>

                <div className="bg-white border border-slate-300 rounded p-2 h-[515px] w-full">
                    <ObjectPreview object={""} />
                </div>
            </div>
        </div>
    );
}

export default ObjectsBrowsePage;
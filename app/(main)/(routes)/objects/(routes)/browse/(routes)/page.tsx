import ObjectPreview from "@/components/Objects/ObjectPreview";
import ObjectList from "../components/ObjectList";

const ObjectsBrowsePage = () => {
    return (
        <div className="">
            <div className="font-semibold text-xl text-theme-BlackPointer mb-10">
                Objects
            </div>
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
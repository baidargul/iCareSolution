import ObjectSummary from "../components/ObjectSummary";
import { PropertiesContainer } from "../components/propertiesContainer";
const CreateObjectPage = async () => {

    return (
        <div className=" p-2 w-full grid grid-rows-2 gap-2">
            <div className="p-2 bg-white rounded-md border border-zinc-500 drop-shadow-md">
                <PropertiesContainer />
            </div>
            <div className="p-2 bg-white rounded-md border h-[110px] border-zinc-500 drop-shadow-md">
                <ObjectSummary />
            </div>
        </div>
    );
}

export default CreateObjectPage;
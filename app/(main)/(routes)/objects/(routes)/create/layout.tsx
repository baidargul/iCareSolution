import ObjectCreateFooter from "./components/Footer";
import ObjectCreateHeader from "./components/Header";
import ToolBoxObjectCreate from "./components/ToolBox";

const ObjectsCreateLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen  bg-theme-Secondry select-none flex flex-col justify-between">
            <ObjectCreateHeader />
            <div className="flex w-full">
                <ToolBoxObjectCreate />
                {children}
            </div>
            <ObjectCreateFooter />
        </div>
    );
}

export default ObjectsCreateLayout;
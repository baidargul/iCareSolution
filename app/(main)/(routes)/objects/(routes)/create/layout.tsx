import ObjectCreateFooter from "./components/Footer";
import ObjectCreateHeader from "./components/Header";
import ToolBoxObjectCreate from "./components/ToolBox";
import { prisma } from "@/lib/prisma-db"
import { initialProfile, } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const ObjectsCreateLayout = async ({ children }: { children: React.ReactNode }) => {
    const profile = await initialProfile();
    if (!profile) redirectToSignIn();

    const newObjectIndex: number = (await prisma.objects.findMany({})).length + 1;

    return (
        <div className="w-full min-h-screen  bg-theme-Secondry select-none flex flex-col justify-between">
            <ObjectCreateHeader newObjectIndex={newObjectIndex} />
            <div className="flex w-full">
                <ToolBoxObjectCreate />
                {children}
            </div>
            <ObjectCreateFooter />
        </div>
    );
}

export default ObjectsCreateLayout;
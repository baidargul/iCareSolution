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

    const categories = await prisma.categories.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    const availableCategories = [] as any;
    categories.map((category) => {
        availableCategories.push({
            value: category.name,
            label: category.name.toUpperCase(),
        })
    })

    return (
        <div className="w-full h-[760px] overflow-hidden bg-theme-Secondry select-none flex flex-col justify-between">
            <ObjectCreateHeader newObjectIndex={newObjectIndex} availableCategories={availableCategories} />
            <div className="flex w-full">
                <ToolBoxObjectCreate />
                {children}
            </div>
        </div>
    );
}

export default ObjectsCreateLayout;
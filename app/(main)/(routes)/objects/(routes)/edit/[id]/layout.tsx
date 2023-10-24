import { prisma } from "@/lib/prisma-db"
import { initialProfile, } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import ObjectEditHeader from "./components/Header";
import ToolBoxObjectEdit from "./components/ToolBox";


interface Props {
    children: React.ReactNode,
    params: {
        id: string
    }
}

const ObjectsEditLayout = async (props: Props) => {
    const profile = await initialProfile();
    if (!profile) redirectToSignIn();

    const objectId = props.params.id;
    const editObject: any = await prisma.objects.findFirst({
        include: {
            categories: true,
            property: {
                include: {
                    propertyValues: {
                        orderBy: {
                            index: 'asc'
                        }
                    }
                },
                orderBy: {
                    index: 'asc'
                }
            },
        },
        where: {
            id: objectId
        },
        orderBy: {
            name: 'asc'
        }
    })


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
            <ObjectEditHeader editObject={editObject} editObjectId={objectId} availableCategories={availableCategories} />
            <div className="flex w-full">
                <ToolBoxObjectEdit />
                {props.children}
            </div>
        </div>
    );
}

export default ObjectsEditLayout;
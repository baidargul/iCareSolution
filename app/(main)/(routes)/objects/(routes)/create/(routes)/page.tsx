import { prisma } from "@/lib/prisma-db"
import { initialProfile, } from "@/lib/initial-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const CreateObjectPage = async () => {
    const profile = await initialProfile();
    if(!profile) redirectToSignIn();

    


    return (
        <div className="bg-white p-2 w-full">
            <h1>Create Object Page</h1>
        </div>
    );
}

export default CreateObjectPage;
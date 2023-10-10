import { initialProfile } from "@/lib/initial-profile"
import InitialModal from "@/components/modals/initial-modal"
import { prisma } from "@/lib/prisma-db"

const Home = async () => {
  const profile = await initialProfile();
  
  return (
    <div>
      Homepage
    </div>
  )
}

export default Home;
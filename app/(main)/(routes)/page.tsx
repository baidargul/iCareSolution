import { initialProfile } from "@/lib/initial-profile"

const Home = async () => {
  const profile = await initialProfile();

  return (
    <div>
      Homepage
    </div>
  )
}

export default Home;
import { useSession } from "next-auth/react"
import { GroupView } from "./groupview";

export const HomePage = () => {
    const sessionData = useSession();
    return (
        <div className="flex flex-col text-center justify-center items-center">
            <span className="pt-10 text-4xl md:text-6xl lg:text-6xl text-white font-extrabold">Welcome back, <span className="text-slate-500">{sessionData.data?.user.name}</span>!</span>
            <GroupView />
        </div>
    )

}
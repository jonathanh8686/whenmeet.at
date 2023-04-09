import { Header } from "~/components/header"

const GroupIndex = () => {
    return (
        <div className="h-screen bg-gradient-to-b from-[#1d0441] to-[#3f1a11]">
            <Header />
            <div className="flex flex-col items-center justify-center my-64">
                <div className="text-8xl text-white pb-12 font-bold">How did you get here?</div>
                <a href=".." className="text-6xl text-blue-400 font-bold">Click here to go back home!</a>
            </div>
        </div>
    )

}

export default GroupIndex
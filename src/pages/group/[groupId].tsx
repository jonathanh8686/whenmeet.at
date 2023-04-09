import { useRouter } from "next/router";
import React from "react";
import { Header } from "~/components/header";
import { api } from "~/utils/api";
import Image from "next/image";

const GroupDetail = () => {

    const router = useRouter()
    const groupId = router.query.groupId as string

    const { data: group, isLoading } = api.group.getGroup.useQuery({
        groupId: groupId
    })

    if (isLoading) {
        return (<p>Loading...</p>)
    }

    if (!group) {
        return (
            <div>404</div>
        )
    }

    console.log(group)

    return (
        <div className="h-screen bg-gradient-to-b from-[#1d0441] to-[#3f1a11]">
            <Header />
            <div className="flex items-center flex-col md:grid md:grid-cols-3">
                <span className="text-center w-full col-span-full pt-10 text-6xl text-white font-extrabold"><span className="text-slate-200">{group.name}</span></span>
                <span className="text-center w-full col-span-full pt-2 mb-10 text-xl text-white font-extrabold"><span className="text-slate-500">{group.id}</span></span>
                <div className="flex flex-col border-4 rounded-3xl items-center m-10 p-5">
                    <span className="text-white text-3xl font-bold">Members:</span>
                    <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-start my-5">
                        {group?.users.map((user) => ( // only get the first 13 users
                            (user.user && user.user.image && user.user.name ?
                                <Image width="100" height="100" key={user.user.id} alt={`${user.user.name} pfp`} className="rounded-full w-full h-full" src={user.user.image}></Image> : <div key={user.userId}>invalid user</div>
                            )))}
                    </div>
                </div>
                <div className="col-span-2 bg-white bg-opacity-30 m-10 h-full">
                </div>
            </div>
        </div>
    )
}

export default GroupDetail
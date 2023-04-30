import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api"
import { IoMdExit } from 'react-icons/io'
import Link from "next/link";
import Image from "next/image";
import { ClipLoader, DotLoader, GridLoader } from "react-spinners";

interface GroupCardProps {
    groupId: string
    refetchGroups: () => void;
}

const GroupCard = ({ groupId: groupId, refetchGroups: refetchGroups }: GroupCardProps) => {
    const { data: group } = api.group.getGroup.useQuery({
        groupId: groupId
    })

    const leaveGroup = api.user.leave.useMutation({
        onSuccess: () => {
            void refetchGroups()
        }
    })

    if (!group) {
        return (
            <div className="relative w-72 h-64 overflow-clip rounded shadow-lg bg-white hover:bg-slate-300 hover:pointer px-6 py-4 flex items-center align-middle justify-center">
                <GridLoader
                    color={"#8500a6"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <Link href={`/group/${encodeURIComponent(groupId)}`}>
            <div className="relative w-72 h-64 overflow-clip rounded shadow-lg bg-white  hover:bg-slate-300 hover:pointer px-6 py-4">
                <div className="flex mb-2">
                    <div className="text-center font-bold text-xl">{group?.name}</div>
                    <div className="flex text-slate-500 text-sm items-center ml-auto">({group.users.length} {group.users.length > 1 ? "members" : "member"})</div>
                </div>
                <p className="grid grid-cols-5 gap-2 text-gray-700 text-base">
                    {group?.users.slice(0, 13).map((user) => ( // only get the first 13 users
                        (user && user.user && user.user.image && user.user.name ?
                            <Image width={100} height={100} key={user.userId} alt={`${user.user.name} pfp`} className="rounded-full w-12" src={user.user.image}></Image> : <div key={user.userId}>error</div>)
                    ))}
                </p>
                <IoMdExit className="absolute hover:fill-red-500 bottom-0 right-0 m-2 text-4xl"
                    onClick={(e) => {
                        e.preventDefault()
                        leaveGroup.mutate({
                            groupId: groupId
                        })
                    }}></IoMdExit>
            </div>
        </Link>
    )
}


interface AddGroupProp {
    refetchGroups: () => void;
}

const AddGroupCard = (props: AddGroupProp) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [groupName, setGroupName] = useState("");

    const createGroup = api.group.create.useMutation({
        onSuccess: () => {
            void props.refetchGroups();
        }
    })

    return (
        <>
            <button onClick={() => setShowAddModal(true)}>
                {<div className="flex items-center text-center justify-center border-2 border-dashed w-72 h-64 overflow-clip rounded shadow-lg hover:pointer hover:bg-slate-400 hover:bg-opacity-25 px-6 py-4 text-5xl">
                    ➕
                </div>}
            </button>

            {showAddModal &&
                <div className="absolute left-1/2 top-1/2 h-1/5 -translate-x-1/2 -translate-y-1/2 flex z-50 outline-none focus:outline-none bg-slate-500 border-3 rounded-2xl">
                    <form className="w-full h-full flex justify-center" onSubmit={(e) => {
                        e.preventDefault()
                        createGroup.mutate({
                            name: groupName
                        });
                        setGroupName("")
                        setShowAddModal(false)
                    }}>
                        <button className="absolute top-0 right-0 border-2 px-3 py-1 rounded-full text-white m-3" onClick={() => { setShowAddModal(false) }} type="button">close</button>
                        <div className="m-20">
                            <input className="h-10 bg-slate-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-slate-800" placeholder="Group Name"
                                value={groupName} onChange={(e) => { setGroupName(e.target.value) }} />
                            <button className="bg-orange-800 h-10 text-white active:bg-pink-950 font-bold uppercase text-sm mx-5 px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="submit"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.nativeEvent.stopImmediatePropagation()
                                }}>
                                Create/Join
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export const GroupView = () => {
    const sessionData = useSession();
    const { data: user, refetch: refetchGroups } = api.user.getSelfWithGroups.useQuery(
        undefined,
        { enabled: sessionData.data?.user !== undefined }
    );

    if (!user) {
        return (
            <div>
                <br></br>
                <br></br>
                <DotLoader
                    color={"#4d0145"}
                    loading={true}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12 mx-10">
            {user.groups.map((group) => (
                <GroupCard key={group.groupId} groupId={group.groupId} refetchGroups={() => { void refetchGroups() }}></GroupCard>
            ))}
            <AddGroupCard refetchGroups={() => { void refetchGroups() }} />
        </div>
    )
}
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RouterOutputs, api } from "~/utils/api"


interface GroupCardProps {
    groupId: string
}

const GroupCard = ({ groupId: groupId }: GroupCardProps) => {
    const { data: group } = api.group.getGroup.useQuery({
        groupId: groupId
    })

    return (
        <button>
            <div className="w-80 h-64 overflow-clip rounded shadow-lg bg-white  hover:bg-slate-300 hover:pointer px-6 py-4">
                <div className="flex mb-2">
                    <div className="text-center font-bold text-xl">{group?.name}</div>
                    <div className="flex text-slate-500 text-sm items-center ml-auto">({group?.users.length} {group?.users.length! > 1 ? "members" : "member"})</div>
                </div>
                <p className="grid grid-cols-5 gap-2 text-gray-700 text-base">
                    {group?.users.slice(0, 13).map((user) => ( // only get the first 13 users
                        <img className="rounded-full w-12" src={user.user.image!}></img>
                    ))}
                </p>
            </div>
        </button>
    )
}

const AddGroupCard = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowAddModal(true)}>
                {<div className="flex items-center text-center justify-center border-2 border-dashed w-80 h-64 overflow-clip rounded shadow-lg hover:pointer hover:bg-slate-400 hover:bg-opacity-25 px-6 py-4 text-5xl">
                    ➕
                </div>}
            </button>

            {showAddModal &&
                <div className="absolute left-1/2 top-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center flex z-50 outline-none focus:outline-none bg-slate-400 bg-opacity-30 border-3 rounded-xl">
                    test
                </div>
            }
        </>
    )
}

export const GroupView = () => {
    const sessionData = useSession();
    const { data: user } = api.user.getOwnGroups.useQuery(
        undefined,
        { enabled: sessionData.data?.user !== undefined }
    );

    return (
        <div className="grid grid-cols-4 gap-4 mt-12">
            {user?.groups.map((group) => (
                <GroupCard groupId={group.groupId}></GroupCard>
            ))}
            <AddGroupCard />
        </div>
    )
}
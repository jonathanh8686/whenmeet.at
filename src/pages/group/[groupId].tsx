import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";

// const GroupDetail = () => {

//     type Group = RouterOutputs['group']['getGroup'];
//     const router = useRouter();
//     const [group, setGroup] = useState<Group | null>(null);

//     useEffect(() => {
//         if (!router.isReady) return
//         console.log(api.group.getGroup.useQuery({
//             groupId: Array.isArray(router.query.groupId!) ? router.query.groupId[0]! : router.query.groupId!
//         }).data)

//     }, [router.isReady])

//     return (
//         <>
//             {group &&
//                 <div>
//                     {group.id}
//                     <br></br>
//                     {group.name}
//                 </div>

//             }
//         </>
//     )
// }

interface GroupDetailProps {
    groupId: string
}

const GroupDetail = (props: GroupDetailProps) => {

    return (
        <h1>this is a prop that contains {props.groupId}</h1>
    )
}

export default GroupDetail

export async function getStaticPaths() {
    console.log(api.user)
    const { data: userWithGroups } = api.user.getSelfWithGroups.useQuery();

    return {
        paths: [
            userWithGroups?.groups.map((e) => (
                {
                    params: {
                        id: e.groupId
                    }
                }
            ))
        ],
        fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props : { groupId: context.params!['groupId'] }
    }

}
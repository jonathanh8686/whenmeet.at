import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";
import { Header } from "~/components/header";
import { Title } from "~/components/title";
import { HomePage } from "~/components/homepage";


const GroupCreate = () => {
  const { data: sessionData } = useSession();

  const createGroup = api.group.create.useMutation();

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 m-5"
      onClick={() => {
        createGroup.mutate({
          name: "test",
        });
      }}>
      Create Group
    </button>
  )
}

const GroupJoin = () => {
  const joinGroup = api.user.join.useMutation();
  const [groupInput, setGroupInput] = useState("");

  return (
    <div className="m-5">
      <input className="mx
    -5" placeholder="Group Name" value={groupInput} onChange={((e) => { setGroupInput(e.target.value) })}></input>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => {
          joinGroup.mutate({
            groupId: groupInput
          })
        }}>
        Join Group
      </button>
    </div>
  )
}

const Home: NextPage = () => {

  const sessionData = useSession();

  return (
    <>
      <Head>
        <title>whenmeet.at</title>
        <meta name="description" content="whenmeet - by jonathan hsieh" />
      </Head>
      <div className="h-screen bg-gradient-to-b from-[#1d0441] to-[#3f1a11]">
        <Header />
        {sessionData.status === "loading" ? <div/> : (sessionData.status === "authenticated" ? <HomePage/> : <Title/>)}
      </div>
    </>
  );
};

export default Home;


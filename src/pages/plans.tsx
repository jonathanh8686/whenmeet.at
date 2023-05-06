import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { Header } from "~/components/header";
import { Title } from "~/components/title";
import { HomePage } from "~/components/homepage";
import { PlanInput } from "~/components/planinput";

const Plans: NextPage = () => {

  const sessionData = useSession();

  return (
    <>
      <Head>
        <title>whenmeet.at</title>
        <meta name="description" content="whenmeet - by jonathan hsieh" />
      </Head>
      <div className="w-screen h-screen bg-gradient-to-b from-[#1d0441] to-[#3f1a11]">
        <Header />
        <PlanInput></PlanInput>
      </div>
    </>
  );
};

export default Plans;

import { NextPage } from "next";
import Head from "next/head";
import Login from "../components/body/Login";
import SSGWithGuestVerification from "../utils/server-side-check/SSGWithGuestVerification";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
};

export default HomePage;

export const getServerSideProps = SSGWithGuestVerification(async () => {
  return {
    props: {},
  };
});

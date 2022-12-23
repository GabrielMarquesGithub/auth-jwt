import { NextPage } from "next";
import Head from "next/head";
import Dashboard from "../components/body/Dashboard";
import SSGWithAuthorizationCheck from "../utils/server-side-check/SSGWithAuthorizationCheck";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Authenticated User</title>
      </Head>
      <main>
        <Dashboard />
      </main>
    </>
  );
};

export default DashboardPage;

export const getServerSideProps = SSGWithAuthorizationCheck(async () => {
  return {
    props: {},
  };
});

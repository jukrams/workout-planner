import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { muscleGroups } from "@/lib/muscle-groups";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNavbar =
    router.pathname !== "/" &&
    !router.pathname.startsWith("/exercises/") &&
    !router.pathname.startsWith("/workouts/");

  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Layout showNavbar={showNavbar}>
          <Component {...pageProps} muscleGroups={muscleGroups} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

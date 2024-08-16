import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { muscleGroups } from "@/lib/muscle-groups";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
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

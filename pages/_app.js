import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { muscleGroups } from "@/lib/muscle-groups";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";

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
  const {
    data: dataExercises = [],
    error: errorExercises,
    isLoading: exerciseIsLoading,
  } = useSWR("/api/exercises", fetcher);

  const router = useRouter();
  const showNavbar =
    router.pathname !== "/" &&
    !router.pathname.startsWith("/exercises/") &&
    !router.pathname.startsWith("/workouts/");

  return (
    <>
      <GlobalStyle />
      <Layout showNavbar={showNavbar}>
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            exercises={dataExercises}
            exerciseIsLoading={exerciseIsLoading}
            muscleGroups={muscleGroups}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}

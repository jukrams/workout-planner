import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { exercises } from "@/lib/exercises.js";
import { workouts } from "@/lib/workouts";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} exercises={exercises} workouts={workouts} />
      </Layout>
    </>
  );
}

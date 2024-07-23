import GlobalStyle from "../styles";
import { exercises } from "@/lib/exercises.js";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} exercises={exercises} />
    </>
  );
}

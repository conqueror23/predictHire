import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const apoloClient = useApollo(pageProps.initialApoloState);
  return (
    <ApolloProvider client={apoloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;

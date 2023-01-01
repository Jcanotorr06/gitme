import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DefaultSeo } from "next-seo";
import { type AppType } from "next/dist/shared/lib/utils";
import { Fragment } from "react";
import BaseLayout from "../layouts/BaseLayout";

import "../styles/globals.css";
import defaultSeoProps from "../utils/next-seo.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <DefaultSeo
        {...defaultSeoProps}
      />
      <BaseLayout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </BaseLayout>
    </Fragment>
  );
};

export default MyApp;

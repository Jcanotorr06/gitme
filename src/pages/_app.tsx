import { DefaultSeo } from "next-seo";
import { type AppType } from "next/dist/shared/lib/utils";
import { Fragment } from "react";
import BaseLayout from "../layouts/BaseLayout";

import "../styles/globals.css";
import defaultSeoProps from "../utils/next-seo.config";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <DefaultSeo
        {...defaultSeoProps}
      />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Fragment>
  );
};

export default MyApp;

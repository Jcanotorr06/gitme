import type { DefaultSeoProps } from "next-seo"

const defaultSeoProps: DefaultSeoProps = {
    title: "GitMe - Get a better view of your GitHub profile",
    description: "GitMe is a web app that helps you get a better view of your GitHub profile.",
    openGraph: {
        type: "website",
        locale: "en_IE",
        url: "https://gitme.vercel.app/",
        site_name: "GitMe",
        images: [],
    },
    twitter: {
        handle: "@spoofy507",
        site: "@spoofy507",
        cardType: "summary_large_image",
    },
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/favicon.ico",
        },
        {
            rel: "apple-touch-icon",
            sizes: "57x57",
            href: "/images/apple-icon-57x57.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "60x60",
            href: "/images/apple-icon-60x60.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "72x72",
            href: "/images/apple-icon-72x72.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "76x76",
            href: "/images/apple-icon-76x76.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "114x114",
            href: "/images/apple-icon-114x114.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "120x120",
            href: "/images/apple-icon-120x120.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "144x144",
            href: "/images/apple-icon-144x144.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "152x152",
            href: "/images/apple-icon-152x152.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/images/apple-icon-180x180.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "192x192",
            href: "/images/android-icon-192x192.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/images/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "96x96",
            href: "/images/favicon-96x96.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/images/favicon-16x16.png",
        },
        {
            rel: "manifest",
            href: "/manifest.json",
        }
    ],
    additionalMetaTags: [
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
        },
        {
            name: "theme-color",
            content: "#000000",
        },
        {
            name: "msapplication-TileColor",
            content: "#000000",
        },
    ]

}

export default defaultSeoProps
import { JSDOM } from "jsdom"

export type Result = {
    user: string;
    url: string;
    title: string;
    description: string;
    language: string;
    languageColor: string;
    stars: string;
    forks: string;
}

const getTrendingRepositories = (html: string, query:string) => {
    const { window } = new JSDOM(html)
    const { document } = window
    const elements = document.querySelectorAll(query)
    const elementArray = Array.from(elements)

    const result: Result[] = []

    elementArray.forEach((element) => {
        const user = element.querySelector("h1.h3.lh-condensed")?.querySelector("a")?.querySelector("span")?.textContent?.trim().replace(/\/+/g, "").trim()
        const url = element.querySelector("h1.h3.lh-condensed")?.querySelector("a")?.href.toString()
        const title = url?.split("/").pop()
        const description = element.querySelector("p.col-9.color-fg-muted.my-1.pr-4")?.textContent?.trim()
        const language = element.querySelector("span[itemprop='programmingLanguage']") ? element.querySelector("span[itemprop='programmingLanguage']")?.textContent?.trim() : undefined
        const languageColor = element.querySelector("span.repo-language-color") ? element.querySelector("span.repo-language-color")?.getAttribute("style")?.split(":")?.pop()?.trim() : undefined
        const stars = element.querySelector("a[href*='stargazers']") ? element.querySelector("a[href*='stargazers']")?.textContent?.trim() : undefined
        const forks = element.querySelector("a[href*='network']") ? element.querySelector("a[href*='network']")?.textContent?.trim() : undefined

        result.push({
            user: user || "",
            url: url || "",
            title: title || "",
            description: description || "",
            language: language || "",
            languageColor: languageColor || "",
            stars: stars || "",
            forks: forks || "",
        })
    })

    return result
}

export default getTrendingRepositories
import { type NextPage } from "next"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react";
import { GoLocation, GoCalendar } from "react-icons/go"
import dayjs from "dayjs"
import RateLimitCounter from "../components/RateLimitCounter";
import useUser from "../queries/useUser";
import { NextSeo } from "next-seo";
import useRepos from "../queries/useRepos";
import RepositoryCard from "../components/RepositoryCard";
import { type Result } from "../utils/parseHTML";
// typescript disable this line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GithubColors from "github-colors"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from "chart.js";
import { MostStarred, StarsperLanguage, TopLanguages } from "../components/Graphs";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const User:NextPage = () => {

  const router = useRouter()
  const { id } = router.query
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    if(!router.query.id) {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    setIsClient(true)
  }, [])

  
  const { data, isLoading, error } = useUser(id as string)
  const repoQuery = useRepos(id as string)
  const languages = repoQuery.data?.map(repo => repo.language)
  const languagesSet = new Set(languages)

  // Top Languages used by user
  const topLanguages = Array.from(languagesSet).map((language, index) => {
    return {
      label: language || "Others",
      count: languages?.filter(l => l === language).length || 0,
      color: language ? GithubColors.get(language).color : "#D9D9D9"
    }
  })

  const reposByStars = repoQuery.data?.sort((a, b) =>  a && b ? b.stargazers_count! - a.stargazers_count! : 0).filter((repo) => repo.stargazers_count! > 0)

  // Most starred repos
  const mostStarredStats = reposByStars?.slice(0, 5).map((repo, i) => ({
    label: repo.name,
    count: repo.stargazers_count || 0,
    color: topLanguages[i]?.color as string || "#D9D9D9"
  }))

  // Stars per language
  const starsPerLanguage = topLanguages.map(language => {
    const repos = repoQuery.data?.filter(repo => repo.language === language.label)
    const stars = repos?.reduce((acc, repo) => acc + repo.stargazers_count!, 0)
    return {
      label: language.label,
      count: stars || 0,
      color: language.color
    }
  }).filter(language => language.count! > 0)

  return (
    <Fragment>
      <NextSeo
        title={data?.name || data?.login || "User"}
        description={data?.bio || "No bio provided"}
        additionalLinkTags={[
          {
            rel: "stylesheet",
            href:"https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
          }
        ]}
      />
      {
        isLoading ? (
          <div className="flex justify-center items-center h-screen"> 
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
          </div>
        ) : (
          <section className="flex flex-col gap-8 justify-center items-center">
            <RateLimitCounter/>
            <article className="flex flex-col gap-4 justify-center items-center">
              <img src={data?.avatar_url} alt="Profile Picture" className="w-24 lg:w-32 rounded-full" />
              <h1 className="text-4xl font-bold">{data?.name}</h1>
              <a 
                className="text-lg font-mono text-blue-400 hover:underline" 
                href={data?.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                @{data?.login}
              </a>
              <p className="text-sm text-slate-300">{data?.bio}</p>
            </article>
            <article className="flex gap-4 justify-between items-center">
              <div className="flex flex-row gap-4 items-center">
                <GoLocation/>
                <p className="text-md">{data?.location}</p>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <GoCalendar/>
                <p className="text-md">Joined {dayjs(data?.created_at).format("MMMM DD, YYYY").toString()}</p>
              </div>
            </article>
            <article className="grid grid-cols-3 gap-4 justify-center items-center">
              <div className="flex flex-col gap-2 p-4 justify-center items-center bg-slate-800 rounded-md">
                <p className="text-lg font-bold">{data?.public_repos}</p>
                <p className="text-sm text-slate-300">Repositories</p>
              </div>
              <div className="flex flex-col gap-2 p-4 justify-center items-center bg-slate-800 rounded-md">
                <p className="text-lg font-bold">{data?.followers}</p>
                <p className="text-sm text-slate-300">Followers</p>
              </div>
              <div className="flex flex-col gap-2 p-4 justify-center items-center bg-slate-800 rounded-md">
                <p className="text-lg font-bold">{data?.following}</p>
                <p className="text-sm text-slate-300">Following</p>
              </div>
            </article>
            <article className="grid gap-8 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TopLanguages size={300} data={topLanguages}/>
              {
                mostStarredStats && 
                <MostStarred size={300} data={mostStarredStats}/>
              }
              <StarsperLanguage size={300} data={starsPerLanguage}/>
            </article>
            {
              repoQuery.isLoading ? (
                <div className="flex justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-500"></div>
                </div>
              ) :
              repoQuery.data?.length ? (
                <article className="flex flex-col gap-4 justify-center items-center">
                  <h1 className="text-2xl font-bold">Your Top Repositories</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                      repoQuery.data?.sort(
                        (a, b) => a && b ? b.stargazers_count! - a.stargazers_count! : 0
                      )
                      .slice(0, 9)
                      .map((rep, index) => {
                        const repo:Result = {
                          title: rep.name,
                          description: rep.description || "",
                          language: rep.language || "",
                          stars: rep.stargazers_count ? rep.stargazers_count.toString() : "",
                          forks: rep.forks_count ? rep.forks_count.toString() : "",
                          url: rep.html_url,
                          user: rep.owner.login,
                          languageColor: GithubColors.get(rep.language || "Python").color
                        }
                        return (
                          <RepositoryCard 
                            repo={repo}
                            key={index}
                            index={index}
                          />
                        )
                      })
                    }
                  </div>
                </article>
              ) : (
                <article className="flex flex-col gap-4 justify-center items-center">
                  <p className="text-lg text-slate-300">No repositories found</p>
                </article>
              )
            }
          </section>
        )
      }
    </Fragment>
  )
}

export default User
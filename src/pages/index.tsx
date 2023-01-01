import type { GetStaticProps, NextPage } from "next";
import { type ChangeEvent, Fragment, useState } from "react";
import getTrendingRepositories, { type Result } from "../utils/parseHTML";
import RepositoryCard from "../components/RepositoryCard";
import { useRouter } from "next/router";

type Props = {
  data: Result[]
}

const Home: NextPage<Props> = (props:Props) => {
  const { data } = props

  const [id, setId] = useState<string>("")
  const router = useRouter()

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handleSearch = () => {
    console.log("Search")
    router.push(`/user?id=${id}`)
  }

  return (
    <Fragment>
      <section className="flex flex-col gap-8 justify-center items-center">
        <article>
          <img src="/github-mark.svg" alt="Github Logo" className="w-24 lg:w-32" />
        </article>
        <article>
          <h1 className="text-4xl font-bold">Find Your Github Profile</h1>
        </article>
        <article className="flex flex-row gap-4 w-full">
          <input 
            name="id" 
            required 
            type="text" 
            placeholder="Search"
            value={id}
            onChange={handleChange}
            className="w-full p-4 rounded-md border border-slate-500 bg-slate-900" 
          />
          <button 
            type="button"
            disabled={id.length === 0}
            onClick={handleSearch}
            className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 transition-colors text-slate-50 p-4 rounded-md"
          >
            Search
          </button>
        </article>
      </section>
      <hr className="my-16 border-transparent"/>
      <section className="flex flex-col gap-8 text-center justify-center items-center">
        <article>
          <h1 className="text-4xl font-bold">Trending Repositories</h1>
        </article>
        <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {
            data.length > 0 ? data.map((repo, index) => (
              <RepositoryCard
                key={index}
                repo={repo}
                index={index}
              />
            ))
            :
            <p className="text-xl font-semibold">No repositories found</p>
          }
        </article>
      </section>
    </Fragment>
  );
};

export const getStaticProps:GetStaticProps = async () => {
  const htmlString = await fetch("https://github.com/trending")
    .then((res) => res.text())
  const data = getTrendingRepositories(htmlString, "article.Box-row")
  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 6, // Every 6 hours
  };
}

export default Home;

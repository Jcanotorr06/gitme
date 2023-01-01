import { FC, Fragment } from "react"
import GithubCorner from "react-github-corner";

type Props = {
    children: React.ReactNode
}

const BaseLayout:FC<Props> = (props:Props) => {

    const { children } = props

  return (
    <Fragment>
      <main className="bg-slate-50 dark:bg-slate-900 dark:text-slate-50 min-h-screen px-4 md:px-12 py-12">
          {children}
      </main>
      <GithubCorner
        href="https://github.com/jcanotorr06"
        bannerColor="#0070f3"
        octoColor="#fff"
        size={80}
        direction="right"
      />
    </Fragment>
  )
}

export default BaseLayout
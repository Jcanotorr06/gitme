import { type FC } from "react"
import { GoGitBranch, GoRepo, GoStar } from "react-icons/go"
import { motion } from "framer-motion"
import type { Result } from "../utils/parseHTML"

type Props = {
    repo: Result,
    index: number
}

const RepositoryCard:FC<Props> = (props:Props) => {

    const { repo, index } = props

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }} 
            key={index} 
            className="flex flex-col justify-between text-left gap-4 bg-slate-800 border border-slate-500 rounded-md p-4"
        >
            {
            repo.title && repo.user && 
                <div className="flex flex-row gap-2 items-center">
                <GoRepo className="text-sm" />
                <a href={`https://github.com${repo.url}`} target="_blank" rel="noreferrer noopener" className="font-semibold text-xl hover:underline">
                    <span className="text-slate-400">
                    {repo.user}
                    </span>
                    /
                    <span>
                    {repo.title}
                    </span>
                </a>
                </div>
            }
            {
            repo.description &&
                <p className="text-slate-400">
                {repo.description}
                </p>
            }
            <div className="flex flex-row gap-4">
            {
                repo.language && repo.languageColor &&
                <div className="flex flex-row gap-2 items-center text-xs">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                    <p className="text-slate-400">
                    {repo.language}
                    </p>
                </div>
            }
            {
                repo.stars &&
                <div className="flex flex-row gap-2 items-center text-xs">
                    <GoStar />
                    <p className="text-slate-400">
                    {repo.stars}
                    </p>
                </div>
            }
            {
                repo.forks &&
                <div className="flex flex-row gap-2 items-center text-xs">
                    <GoGitBranch />
                    <p className="text-slate-400">
                    {repo.forks}
                    </p>
                </div>
            }
            </div>
        </motion.div>
    )
}

export default RepositoryCard
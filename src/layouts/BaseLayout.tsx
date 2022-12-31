import type { FC } from "react"

type Props = {
    children: React.ReactNode
}

const BaseLayout:FC<Props> = (props:Props) => {

    const { children } = props

  return (
    <main className="bg-slate-50 dark:bg-slate-900 dark:text-slate-50 min-h-screen">
        {children}
    </main>
  )
}

export default BaseLayout
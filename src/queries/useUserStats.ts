import { useQuery } from "@tanstack/react-query";
// typescript disable this line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Polyglot from "gh-polyglot"
import type { UserStat } from "../types/polyglot";

const useUserStats = (id: string | null) => {
    return useQuery({
        queryKey: ["user-stats", id],
        queryFn: async () => {
            const polyglot = new Polyglot(id as string)
            const data:UserStat|null = await polyglot.userStats((err: unknown, data: UserStat) => {
                if (err) {
                    return null
                }
                return data
            })
            console.log("USER STATS", data)
            return data
        },
        enabled: !!id,
    })
}

export default useUserStats
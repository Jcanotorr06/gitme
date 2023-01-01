import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/rest"

const useRateLimit = (id: string | null) => {
    const octokit = new Octokit()
    return useQuery({
        queryKey: ["rate", id],
        queryFn: async () => {
            const { data } = await octokit.request("GET /rate_limit")
            return data
        },
        enabled: !!id,
    })
}

export default useRateLimit
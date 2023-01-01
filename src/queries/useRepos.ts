import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/rest"

const useRepos = (id: string | null) => {
    const octokit = new Octokit()
    return useQuery({
        queryKey: ["repos", id],
        queryFn: async () => {
            const { data } = await octokit.request("GET /users/{username}/repos", {
                username: id as string,
                per_page: 100
            })
            return data
        },
        enabled: !!id,
    })
}

export default useRepos
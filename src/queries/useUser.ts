import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/rest"

const useUser = (id: string | null) => {
    const octokit = new Octokit()
    return useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const { data } = await octokit.request("GET /users/{username}", {
                username: id as string,
            })
            return data
        },
        enabled: !!id,
    })
}

export default useUser
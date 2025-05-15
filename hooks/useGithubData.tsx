// hooks/useGitHubData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GitHubUser, GitHubRepo, RateLimit } from "../types/github";

const fetchUser = async (): Promise<GitHubUser> => {
    const { data } = await axios.get("/api/github/user");
    return data;
};

const fetchRepos = async (): Promise<GitHubRepo[]> => {
    const { data } = await axios.get("/api/github/repos");
    console.log("Fetched Repos:", data);
    return data; // Should include both private and public repos
};

const fetchRateLimit = async (): Promise<RateLimit> => {
    const { data } = await axios.get("/api/github/rate-limit");
    return data;
};

export const useGitHubData = (showPrivate = false) => {
    const {
        data: userData,
        isLoading: userLoading,
        error: userError,
        refetch: refetchUser,
    } = useQuery({
        queryKey: ["githubUser"],
        queryFn: fetchUser,
        staleTime: 60_000,
    });

    const {
        data: allRepos,
        isLoading: reposLoading,
        error: reposError,
        refetch: refetchRepos,
    } = useQuery({
        queryKey: ["githubRepos", showPrivate], // <- React Query will now refetch on toggle
        queryFn: fetchRepos,
        staleTime: 60_000,
    });

    const {
        data: rateLimit,
        isLoading: rateLimitLoading,
        error: rateLimitError,
        refetch: refetchRateLimit,
    } = useQuery({
        queryKey: ["githubRateLimit"],
        queryFn: fetchRateLimit,
        staleTime: 60_000,
    });

    const filteredRepos = allRepos?.filter(repo => showPrivate || !repo.private) ?? [];
    const filteredReposCount = filteredRepos.length;
    console.log("Filtered Repos Count:", filteredReposCount);
    console.log("All Repos Count:", allRepos?.length);
    // useEffect(()=>{

    // })

    return {
        userData,
        repos: filteredRepos,
        rateLimit,
        loading: {
            user: userLoading,
            repos: reposLoading,
            rateLimit: rateLimitLoading,
        },
        error: {
            user: userError instanceof Error ? userError.message : null,
            repos: reposError instanceof Error ? reposError.message : null,
            rateLimit:
                rateLimitError instanceof Error ? rateLimitError.message : null,
        },
        fetchUserData: () => refetchUser(),
        fetchRepositories: () => refetchRepos(),
        fetchRateLimit: () => refetchRateLimit(),
        fetchAllData: () => {
            refetchUser();
            refetchRepos();
            refetchRateLimit();
        },
    };
};

export default useGitHubData;

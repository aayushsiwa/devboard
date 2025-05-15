import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import useGitHubData from "../hooks/useGitHubData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUser = { login: "octocat", public_repos: 5 };
const mockRepos = [
  { id: 1, name: "Repo1", private: false },
  { id: 2, name: "PrivateRepo", private: true },
];
const mockRateLimit = { rate: { remaining: 5000, limit: 5000 } };

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGitHubData", () => {
  it("returns filtered repos based on showPrivate flag", async () => {
    mockedAxios.get.mockImplementation((url) => {
      switch (url) {
        case "/api/github/user":
          return Promise.resolve({ data: mockUser });
        case "/api/github/repos":
          return Promise.resolve({ data: mockRepos });
        case "/api/github/rate-limit":
          return Promise.resolve({ data: mockRateLimit });
        default:
          return Promise.reject(new Error("Unknown endpoint"));
      }
    });

    const { result } = renderHook(() => useGitHubData(false), { wrapper });

    await waitFor(() => {
      expect(result.current.loading.user).toBe(false);
    });

    expect(result.current.repos).toHaveLength(1);
    expect(result.current.repos[0].name).toBe("Repo1");

    // showPrivate = true
    const { result: resultPrivate } = renderHook(() => useGitHubData(true), {
      wrapper,
    });

    await waitFor(() => {
      expect(resultPrivate.current.repos).toHaveLength(2);
    });
  });
});

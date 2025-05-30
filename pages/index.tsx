// import { useState } from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import {
    Box,
    Grid,
    // Typography,
    Alert,
    // Button,
    Chip,
    // Switch,
    // FormControlLabel,
} from "@mui/material";
// import RefreshIcon from "@mui/icons-material/Refresh";
import Layout from "@/components/Layout";
import UserInfoCard from "@/components/dashboard/UserInfoCard";
import RateLimitCard from "@/components/dashboard/RateLimitCard";
import RepoListCard from "@/components/dashboard/RepoListCard";
import RepoLanguageChart from "@/components/dashboard/RepoLanguageChart";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import useGitHubData from "@/hooks/useGitHubData";
import { useDashboardPreferences } from "@/context/DashboardPreferencesContext";

// import { motion } from "framer-motion";

export default function Home() {
    useSession();

    const {
        showPrivateRepos,
        // togglePrivateRepos,
        showRateLimit,
        toggleRateLimit,
    } = useDashboardPreferences();

    const { userData, repos, rateLimit, loading, error, fetchAllData } =
        useGitHubData(showPrivateRepos);

    const isAnyLoading = loading.user || loading.repos || loading.rateLimit;
    const isInitialLoading = loading.user && loading.repos && loading.rateLimit;

    return (
        <Layout
            onRefresh={() => fetchAllData()}
            showRateLimit={showRateLimit}
            toggleRateLimit={toggleRateLimit} // ✅ correct
            // showPrivateRepos={showPrivateRepos}
            // togglePrivateRepos={togglePrivateRepos} // ✅ correct
        >
            {/* <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            > */}
            {/* <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        GitHub Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Access GitHub API data without rate limit concerns
                    </Typography>
                </Box> */}

            {/* <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={fetchAllData}
                        disabled={isAnyLoading}
                    >
                        Refresh Data
                    </Button>
                </motion.div> */}
            {/* </Box> */}

            {/* Toggle to show/hide rate limit */}
            {/* <Box sx={{ mb: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={showRateLimit}
                            onChange={() => setShowRateLimit((prev) => !prev)}
                            color="primary"
                        />
                    }
                    label="Show Rate Limit Info"
                />
            </Box> */}

            {/* Show errors if any */}
            {(error.user || error.repos || error.rateLimit) && (
                <Box sx={{ mb: 3 }}>
                    {error.user && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                            {error.user}
                        </Alert>
                    )}
                    {error.repos && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                            {error.repos}
                        </Alert>
                    )}
                    {error.rateLimit && (
                        <Alert severity="error" sx={{ mb: 1 }}>
                            {error.rateLimit}
                        </Alert>
                    )}
                </Box>
            )}

            {isInitialLoading ? (
                <DashboardSkeleton />
            ) : (
                <Grid container spacing={3}>
                    {/* Left Side: User Info + Languages */}
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            <UserInfoCard
                                user={userData ?? null}
                                loading={loading.user}
                                repos={repos}
                            />
                            <RepoLanguageChart
                                repos={repos}
                                loading={loading.repos}
                            />
                        </Box>
                    </Grid>

                    {/* Right Side: Rate Limit + Repo List */}
                    <Grid item xs={12} md={8}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            {showRateLimit && (
                                <RateLimitCard
                                    rateLimit={rateLimit ?? null}
                                    loading={loading.rateLimit}
                                />
                            )}
                            <RepoListCard
                                repos={repos}
                                loading={loading.repos}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Chip
                        size="small"
                        color={isAnyLoading ? "warning" : "success"}
                        label={isAnyLoading ? "Refreshing..." : "Online"}
                    />
                </Box>
            </Box>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

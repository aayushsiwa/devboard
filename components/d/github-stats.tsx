"use client";
// import { useState, useEffect } from "react"
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    Box,
    LinearProgress,
    Skeleton,
    Paper,
} from "@mui/material";
import {
    GitHub as GitHubIcon,
    Star as StarIcon,
    CallSplit as ForkIcon,
    Code as CodeIcon,
    Warning as WarningIcon,
} from "@mui/icons-material";
import I from "./i";

interface GitHubStatsProps {
    className?: string;
    username?: string;
    isLoading?: boolean;
    errorMessage?: string | null;
    statsData?: {
        stars: number;
        forks: number;
        repos: number;
        languages: {
            [key: string]: number;
        };
    };
}

export default function GitHubStats({
    className,
    username = "aayushsiwa",
    isLoading = false,
    errorMessage = null,
    statsData,
}: GitHubStatsProps) {
    // Format numbers with commas
    const formatNumber = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Get top languages and their percentages
    const getTopLanguages = () => {
        if (!statsData?.languages) return [];

        const totalSize = Object.values(statsData.languages).reduce(
            (sum, size) => sum + size,
            0
        );

        if (totalSize === 0) return [];

        return Object.entries(statsData.languages)
            .map(([language, size]) => ({
                language,
                percentage: Math.round((size / totalSize) * 100),
                size,
            }))
            .sort((a, b) => b.size - a.size)
            .slice(0, 4);
    };

    // Map of language colors
    const languageColors: { [key: string]: string } = {
        TypeScript: "#3178C6",
        JavaScript: "#F7DF1E",
        Python: "#3776AB",
        CSS: "#563D7C",
        HTML: "#E34C26",
        Java: "#007396",
        Ruby: "#CC342D",
        Go: "#00ADD8",
        Swift: "#F05138",
        Kotlin: "#A97BFF",
        Rust: "#DEA584",
        C: "#555555",
        "C++": "#F34B7D",
        "C#": "#178600",
        PHP: "#777BB4",
        Shell: "#89E051",
        // Add more languages as needed
    };

    const getLanguageColor = (language: string): string => {
        return languageColors[language] || "#858585"; // Default color
    };

    const topLanguages = getTopLanguages();

    return (
        <Card className={className}>
            <I />
            <CardHeader
                title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <GitHubIcon fontSize="small" />
                        <Typography variant="h6">
                            GitHub Stats for {username}
                        </Typography>
                    </Box>
                }
                subheader="GitHub activity and statistics"
            />
            <CardContent>
                {isLoading ? (
                    <GitHubStatsSkeleton />
                ) : errorMessage ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            p: 3,
                            gap: 2,
                        }}
                    >
                        <WarningIcon color="error" fontSize="large" />
                        <Typography color="error" align="center">
                            {errorMessage}
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <StatCard
                                    icon={<StarIcon />}
                                    value={formatNumber(statsData?.stars || 0)}
                                    label="Total Stars"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StatCard
                                    icon={<ForkIcon />}
                                    value={formatNumber(statsData?.forks || 0)}
                                    label="Forks"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <StatCard
                                    icon={<CodeIcon />}
                                    value={formatNumber(statsData?.repos || 0)}
                                    label="Repositories"
                                />
                            </Grid>
                        </Grid>
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Top Languages
                            </Typography>
                            {topLanguages.length > 0 ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1.5,
                                    }}
                                >
                                    {topLanguages.map((item) => (
                                        <LanguageBar
                                            key={item.language}
                                            language={item.language}
                                            percentage={item.percentage}
                                            color={getLanguageColor(
                                                item.language
                                            )}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    No language data available
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

function StatCard({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string;
    label: string;
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                        ? "background.default"
                        : "grey.100",
                borderRadius: 1,
            }}
        >
            <Box sx={{ color: "text.secondary", mb: 0.5 }}>{icon}</Box>
            <Typography variant="h6" fontWeight="bold">
                {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
        </Paper>
    );
}

function LanguageBar({
    language,
    percentage,
    color,
}: {
    language: string;
    percentage: number;
    color: string;
}) {
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                }}
            >
                <Typography variant="body2">{language}</Typography>
                <Typography variant="body2">{percentage}%</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{
                    height: 8,
                    borderRadius: 1,
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "background.default"
                            : "grey.200",
                    "& .MuiLinearProgress-bar": {
                        bgcolor: color,
                    },
                }}
            />
        </Box>
    );
}

function GitHubStatsSkeleton() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Grid container spacing={2}>
                {[...Array(3)].map((_, i) => (
                    <Grid item xs={4} key={i}>
                        <Paper
                            elevation={0}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 2,
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "background.default"
                                        : "grey.100",
                                borderRadius: 1,
                            }}
                        >
                            <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                                sx={{ mb: 0.5 }}
                            />
                            <Skeleton variant="text" width={60} height={32} />
                            <Skeleton variant="text" width={40} height={16} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Box>
                <Skeleton
                    variant="text"
                    width={100}
                    height={24}
                    sx={{ mb: 1 }}
                />
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                    {[...Array(4)].map((_, i) => (
                        <Box key={i} sx={{ width: "100%" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 0.5,
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width={80}
                                    height={20}
                                />
                                <Skeleton
                                    variant="text"
                                    width={30}
                                    height={20}
                                />
                            </Box>
                            <Skeleton
                                variant="rectangular"
                                height={8}
                                width="100%"
                                sx={{ borderRadius: 1 }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

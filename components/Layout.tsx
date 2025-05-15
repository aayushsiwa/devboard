import { ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import { motion } from "framer-motion";
// import theme from "./theme";
import { ThemeToggleProvider } from "@/hooks/ThemeToggleProvider";

interface LayoutProps {
    children: ReactNode;
    onRefresh: () => void;
    showRateLimit: boolean;
    toggleRateLimit: () => void;
    showPrivateRepos: boolean;
    togglePrivateRepos: () => void;
}

const Layout = ({
    children,
    onRefresh,
    showRateLimit,
    toggleRateLimit,
    showPrivateRepos,
    togglePrivateRepos,
}: LayoutProps) => {
    return (
        <ThemeToggleProvider>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Header
                    onRefresh={onRefresh}
                    showRateLimit={showRateLimit}
                    toggleRateLimit={toggleRateLimit}
                    showPrivateRepos={showPrivateRepos}
                    togglePrivateRepos={togglePrivateRepos}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            py: 4,
                            px: { xs: 2, sm: 4, md: 6 },
                            maxWidth: "xl",
                            mx: "auto",
                            width: "100%",
                        }}
                    >
                        {children}
                    </Box>
                </motion.div>
            </Box>
        </ThemeToggleProvider>
    );
};

export default Layout;

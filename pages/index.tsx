import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Box, Grid, Typography, Alert, Button, Chip } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import Layout from "../components/Layout";
import UserInfoCard from "../components/dashboard/UserInfoCard";
import RateLimitCard from "../components/dashboard/RateLimitCard";
import RepoListCard from "../components/dashboard/RepoListCard";
import RepoLanguageChart from "../components/dashboard/RepoLanguageChart";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import useGitHubData from "../hooks/useGithubData";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();
  const { 
    userData, 
    repos, 
    rateLimit,
    loading, 
    error, 
    fetchAllData 
  } = useGitHubData();

  // Check if any loading state is true
  const isAnyLoading = loading.user || loading.repos || loading.rateLimit;
  
  // Check if this is initial loading (all loading states are true)
  const isInitialLoading = loading.user && loading.repos && loading.rateLimit;

  return (
    <Layout>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            GitHub Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Access GitHub API data without rate limit concerns
          </Typography>
        </Box>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />}
            onClick={fetchAllData}
            disabled={isAnyLoading}
          >
            Refresh Data
          </Button>
        </motion.div>
      </Box>

      {/* Show errors if any */}
      {(error.user || error.repos || error.rateLimit) && (
        <Box sx={{ mb: 3 }}>
          {error.user && <Alert severity="error" sx={{ mb: 1 }}>{error.user}</Alert>}
          {error.repos && <Alert severity="error" sx={{ mb: 1 }}>{error.repos}</Alert>}
          {error.rateLimit && <Alert severity="error" sx={{ mb: 1 }}>{error.rateLimit}</Alert>}
        </Box>
      )}

      {isInitialLoading ? (
        <DashboardSkeleton />
      ) : (
        <Grid container spacing={3}>
          {/* User Info */}
          <Grid item xs={12} md={4}>
            <UserInfoCard user={userData} loading={loading.user} />
          </Grid>
          
          {/* Rate Limits */}
          <Grid item xs={12} md={8}>
            <RateLimitCard rateLimit={rateLimit} loading={loading.rateLimit} />
          </Grid>

          {/* Repositories List */}
          <Grid item xs={12} lg={8}>
            <RepoListCard repos={repos} loading={loading.repos} />
          </Grid>
          
          {/* Language Chart */}
          <Grid item xs={12} lg={4}>
            <RepoLanguageChart repos={repos} loading={loading.repos} />
          </Grid>
        </Grid>
      )}
      
      {/* API Status */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <Typography variant="body2" color="text.secondary">
          Data last refreshed: {new Date().toLocaleTimeString()}
        </Typography> */}
        
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
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
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
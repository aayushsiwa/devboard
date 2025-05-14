import { Box, Paper, Typography, LinearProgress, Tooltip, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { RateLimit } from '../../types/github';
import { format } from 'date-fns';

interface RateLimitCardProps {
  rateLimit: RateLimit | null;
  loading: boolean;
}

const RateLimitCard = ({ rateLimit, loading }: RateLimitCardProps) => {
  const calculatePercentRemaining = (used: number, limit: number) => {
    return Math.round(((limit - used) / limit) * 100);
  };
  
  const getColor = (percentage: number) => {
    if (percentage > 50) return 'success';
    if (percentage > 25) return 'warning';
    return 'error';
  };

  const formatResetTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return format(date, 'h:mm a');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          API Rate Limits
        </Typography>
        
        {loading ? (
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={20} sx={{ mt: 1, mb: 2 }} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={20} sx={{ mt: 1, mb: 2 }} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
          </Box>
        ) : rateLimit ? (
          <Box sx={{ mt: 2 }}>
            {/* Core API Rate Limit */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  REST API
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rateLimit.resources.core.remaining} / {rateLimit.resources.core.limit} remaining
                </Typography>
              </Box>
              
              <Tooltip 
                title={`Resets at ${formatResetTime(rateLimit.resources.core.reset)}`} 
                arrow
                placement="top"
              >
                <Box sx={{ width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculatePercentRemaining(rateLimit.resources.core.used, rateLimit.resources.core.limit)}
                    color={getColor(calculatePercentRemaining(rateLimit.resources.core.used, rateLimit.resources.core.limit))}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </Tooltip>
            </Box>
            
            {/* Search API Rate Limit */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  Search API
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rateLimit.resources.search.remaining} / {rateLimit.resources.search.limit} remaining
                </Typography>
              </Box>
              
              <Tooltip 
                title={`Resets at ${formatResetTime(rateLimit.resources.search.reset)}`} 
                arrow
                placement="top"
              >
                <Box sx={{ width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculatePercentRemaining(rateLimit.resources.search.used, rateLimit.resources.search.limit)}
                    color={getColor(calculatePercentRemaining(rateLimit.resources.search.used, rateLimit.resources.search.limit))}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </Tooltip>
            </Box>
            
            {/* GraphQL API Rate Limit */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  GraphQL API
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rateLimit.resources.graphql.remaining} / {rateLimit.resources.graphql.limit} remaining
                </Typography>
              </Box>
              
              <Tooltip 
                title={`Resets at ${formatResetTime(rateLimit.resources.graphql.reset)}`} 
                arrow
                placement="top"
              >
                <Box sx={{ width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculatePercentRemaining(rateLimit.resources.graphql.used, rateLimit.resources.graphql.limit)}
                    color={getColor(calculatePercentRemaining(rateLimit.resources.graphql.used, rateLimit.resources.graphql.limit))}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">No rate limit data available</Typography>
        )}
      </Paper>
    </motion.div>
  );
};

export default RateLimitCard;
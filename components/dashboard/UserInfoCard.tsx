import { Paper, Box, Avatar, Typography, Divider, Grid, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import { GitHubUser } from '../../types/github';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface UserInfoCardProps {
  user: GitHubUser | null;
  loading: boolean;
}

const UserInfoCard = ({ user, loading }: UserInfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width="80%" height={60} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        ) : user ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Avatar
              src={user.avatar_url}
              alt={user.name || user.login}
              sx={{ width: 100, height: 100, mb: 2, border: '3px solid #f0f0f0' }}
            />
            <Typography variant="h4" component="h2" gutterBottom>
              {user.name || 'No Name'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              @{user.login}
            </Typography>
            
            {user.bio && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                {user.bio}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{user.followers}</Typography>
                <Typography variant="body2" color="text.secondary">Followers</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{user.following}</Typography>
                <Typography variant="body2" color="text.secondary">Following</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{user.public_repos}</Typography>
                <Typography variant="body2" color="text.secondary">Repositories</Typography>
              </Box>
            </Box>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Grid container spacing={1} sx={{ mt: 1 }}>
              {user.location && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.location}</Typography>
                  </Box>
                </Grid>
              )}
              
              {user.company && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <BusinessIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.company}</Typography>
                  </Box>
                </Grid>
              )}
              
              {user.blog && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <LinkIcon fontSize="small" color="action" />
                    <Typography variant="body2" component="a" href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main' }}>
                      {user.blog}
                    </Typography>
                  </Box>
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    Joined {formatDistance(new Date(user.created_at), new Date(), { addSuffix: true })}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography variant="body1" align="center">No user data available</Typography>
        )}
      </Paper>
    </motion.div>
  );
};

export default UserInfoCard;
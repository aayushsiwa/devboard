import { Grid, Skeleton, Paper, Box } from '@mui/material';

const DashboardSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width="80%" height={60} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
          <Skeleton variant="text" width={200} height={30} sx={{ mb: 2 }} />
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={20} sx={{ mt: 1, mb: 2 }} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={20} sx={{ mt: 1, mb: 2 }} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={8}>
        <Paper elevation={0} sx={{ height: '100%' }}>
          <Box sx={{ p: 3 }}>
            <Skeleton variant="text" width={200} height={30} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Skeleton variant="rectangular" width="45%" height={40} />
              <Skeleton variant="rectangular" width="20%" height={40} />
            </Box>
          </Box>
          
          <Box>
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ px: 3, py: 2, borderTop: index > 0 ? 1 : 0, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ width: '100%' }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" />
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={60} height={24} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} lg={4}>
        <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
          <Skeleton variant="text" width={150} height={30} sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 3 }}>
            <Skeleton variant="circular" width={200} height={200} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardSkeleton;
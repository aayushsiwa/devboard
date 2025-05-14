import { useSession, signOut } from 'next-auth/react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { motion } from 'framer-motion';

const Header = () => {
  const { data: session } = useSession();

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="github"
                sx={{ mr: 1 }}
              >
                <GitHubIcon />
              </IconButton>
            </motion.div>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 700 }}
            >
              GitHub Stats Dashboard
            </Typography>
          </Box>

          {session ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                  src={session.user?.image || ''} 
                  alt={session.user?.name || 'User'}
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {session.user?.name}
                </Typography>
              </Box>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  startIcon={<ExitToAppIcon />}
                  size="small"
                  sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                >
                  Sign Out
                </Button>
              </motion.div>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
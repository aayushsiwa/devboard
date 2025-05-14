import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { Box, Button, Container, Paper, Typography, Avatar } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from "framer-motion";

interface SignInProps {
  providers: Record<string, {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  }>;
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', mb: 2 }}>
              <GitHubIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Sign in with your GitHub account to access the dashboard
            </Typography>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            {Object.values(providers).map(provider => (
              <motion.div
                key={provider.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  startIcon={<GitHubIcon />}
                  sx={{ py: 1.5, fontSize: '1rem' }}
                >
                  Sign in with {provider.name}
                </Button>
              </motion.div>
            ))}
          </Box>
          
          <Box sx={{ mt: 4, pt: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              This application uses OAuth to authenticate with GitHub, 
              which eliminates rate limit concerns for API calls.
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? {} },
  };
};
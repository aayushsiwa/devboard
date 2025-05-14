import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { GitHubUser, GitHubRepo, RateLimit } from '../types/github';

export const useGitHubData = () => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [loading, setLoading] = useState<{user: boolean; repos: boolean; rateLimit: boolean}>({
    user: false,
    repos: false,
    rateLimit: false
  });
  const [error, setError] = useState<{user: string | null; repos: string | null; rateLimit: string | null}>({
    user: null,
    repos: null,
    rateLimit: null
  });

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, user: true }));
      setError(prev => ({ ...prev, user: null }));
      
      const response = await axios.get('/api/github/user');
      setUserData(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(prev => ({ 
        ...prev, 
        user: 'Failed to fetch user data. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, user: false }));
    }
  }, []);

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, repos: true }));
      setError(prev => ({ ...prev, repos: null }));
      
      const response = await axios.get('/api/github/repos');
      setRepos(response.data);
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError(prev => ({ 
        ...prev, 
        repos: 'Failed to fetch repositories. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, repos: false }));
    }
  }, []);

  const fetchRateLimit = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, rateLimit: true }));
      setError(prev => ({ ...prev, rateLimit: null }));
      
      const response = await axios.get('/api/github/rate-limit');
      setRateLimit(response.data);
    } catch (err) {
      console.error('Error fetching rate limit:', err);
      setError(prev => ({ 
        ...prev, 
        rateLimit: 'Failed to fetch rate limit data. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, rateLimit: false }));
    }
  }, []);

  const fetchAllData = useCallback(() => {
    fetchUserData();
    fetchRepositories();
    fetchRateLimit();
  }, [fetchUserData, fetchRepositories, fetchRateLimit]);
  
  // Initial data load effect
  useEffect(() => {
    fetchAllData();
    
    // Refresh rate limit data every 5 minutes
    const intervalId = setInterval(() => {
      fetchRateLimit();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchAllData, fetchRateLimit]);

  return {
    userData,
    repos,
    rateLimit,
    loading,
    error,
    fetchUserData,
    fetchRepositories,
    fetchRateLimit,
    fetchAllData
  };
};

export default useGitHubData;
import { useState, useEffect } from 'react';
import { Paper, Typography, Box, useTheme, Skeleton } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { GitHubRepo } from '../../types/github';
import type { TooltipProps } from 'recharts';

interface RepoLanguageChartProps {
  repos: GitHubRepo[] | null;
  loading: boolean;
}

interface LanguageData {
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8',
  '#82ca9d', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc658'
];

const RepoLanguageChart = ({ repos, loading }: RepoLanguageChartProps) => {
  const theme = useTheme();
  const [data, setData] = useState<LanguageData[]>([]);

  useEffect(() => {
    if (!repos) return;

    const languageCounts: Record<string, number> = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    
    // Convert to array and sort by count
    const sortedData = Object.entries(languageCounts)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value);
    
    // Limit to top 10 languages
    setData(sortedData.slice(0, 10));
  }, [repos]);


  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 1.5, 
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          boxShadow: 1
        }}>
          <Typography variant="body2" color="text.primary">
            <span style={{ fontWeight: 600 }}>{payload[0].name}</span>: {payload[0].value} {payload[0].value === 1 ? 'repo' : 'repos'}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Languages
        </Typography>
        
        {loading ? (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
            <Skeleton variant="circular" width={250} height={250} />
          </Box>
        ) : data.length > 0 ? (
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
            <Typography variant="body1" color="text.secondary">
              No language data available
            </Typography>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default RepoLanguageChart;
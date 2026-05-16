import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { show } = useToast();

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/analytics/vendor');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
      // show('Failed to load dashboard data', 'danger');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats
  };
}

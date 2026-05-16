import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useVerification() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { show } = useToast();

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/verification/status');
      if (res.data.success) {
        setStatus(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch verification status');
    } finally {
      setLoading(false);
    }
  }, []);

  const apply = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/verification/apply', data);
      if (res.data.success) {
        setStatus(res.data.data);
        show('Verification application submitted successfully!');
        return { success: true };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Failed to submit application', 'danger');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, loading, error, apply, refresh: fetchStatus };
}

import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useWallet() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const fetchWallet = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/wallet');
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      show('Failed to load wallet data', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  const requestPayout = async (payoutData) => {
    try {
      const res = await api.post('/wallet/withdraw', payoutData);
      if (res.data.success) {
        show('Payout request submitted successfully!', 'success');
        fetchWallet(); // Refresh
        return { success: true };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Payout request failed', 'danger');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return {
    wallet: data?.wallet,
    history: data?.history || [],
    loading,
    refresh: fetchWallet,
    requestPayout
  };
}

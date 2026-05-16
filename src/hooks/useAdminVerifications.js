import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useAdminVerifications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/verification/admin/all');
      if (res.data.success) {
        setApplications(res.data.data);
      }
    } catch (err) {
      show('Failed to fetch verification queue', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  const review = async (id, status, notes = '') => {
    try {
      const res = await api.put(`/verification/admin/${id}`, { status, adminNotes: notes });
      if (res.data.success) {
        setApplications(prev => prev.map(a => a._id === id ? res.data.data : a));
        show(`Application ${status} successfully!`);
        return { success: true };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Review failed', 'danger');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, loading, review, refresh: fetchApplications };
}

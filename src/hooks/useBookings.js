import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { show } = useToast();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings');
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      show('Failed to load bookings', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  const updateBookingStatus = async (id, status) => {
    try {
      const res = await api.put(`/bookings/${id}`, { status });
      if (res.data.success) {
        setBookings(prev => prev.map(b => b._id === id ? res.data.data : b));
        show(`Booking ${status} successfully!`);
        return { success: true, data: res.data.data };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Failed to update booking', 'danger');
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refresh: fetchBookings,
    updateBookingStatus
  };
}

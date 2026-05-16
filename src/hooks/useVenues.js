import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useVenues(onlyMyVenues = false) {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { show } = useToast();

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = onlyMyVenues ? '/venues/my' : '/venues';
      const res = await api.get(endpoint);
      if (res.data.success) {
        setVenues(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch venues');
      show('Failed to load venues', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show, onlyMyVenues]);


  const createVenue = async (venueData) => {
    try {
      const res = await api.post('/venues', venueData);
      if (res.data.success) {
        setVenues(prev => [...prev, res.data.data]);
        show('Venue created successfully!');
        return { success: true, data: res.data.data };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Failed to create venue', 'danger');
      return { success: false, error: err.message };
    }
  };

  const updateVenue = async (id, venueData) => {
    try {
      const res = await api.put(`/venues/${id}`, venueData);
      if (res.data.success) {
        setVenues(prev => prev.map(v => v._id === id ? res.data.data : v));
        show('Venue updated successfully!');
        return { success: true, data: res.data.data };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Failed to update venue', 'danger');
      return { success: false, error: err.message };
    }
  };

  const deleteVenue = async (id) => {
    try {
      const res = await api.delete(`/venues/${id}`);
      if (res.data.success) {
        setVenues(prev => prev.filter(v => v._id !== id));
        show('Venue deleted successfully!', 'warning');
        return { success: true };
      }
    } catch (err) {
      show(err.response?.data?.message || 'Failed to delete venue', 'danger');
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return {
    venues,
    loading,
    error,
    refresh: fetchVenues,
    createVenue,
    updateVenue,
    deleteVenue
  };
}

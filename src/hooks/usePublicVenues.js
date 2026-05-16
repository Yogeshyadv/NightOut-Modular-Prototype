import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export function usePublicVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/venues');
      if (res.data.success) {
        // Only show active venues to the public
        setVenues(res.data.data.filter(v => v.status === 'active'));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load venues');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, error, refresh: fetchVenues };
}

export function useVenue(id) {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/venues/${id}`);
        if (res.data.success) {
          setVenue(res.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Venue not found');
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  return { venue, loading, error };
}

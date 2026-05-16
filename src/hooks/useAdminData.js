import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { useToast } from './useToast';

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      show('Failed to load users', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/users/${id}`);
      if (res.data.success) {
        setUsers(prev => prev.filter(u => u._id !== id));
        show('User removed successfully', 'warning');
        return { success: true };
      }
    } catch (err) {
      show('Failed to delete user', 'danger');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, refresh: fetchUsers, deleteUser };
}

export function useAdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const fetchVendors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/vendors');
      if (res.data.success) {
        setVendors(res.data.data);
      }
    } catch (err) {
      show('Failed to load vendors', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  return { vendors, loading, refresh: fetchVendors };
}

export function useAdminVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/venues');
      if (res.data.success) {
        setVenues(res.data.data);
      }
    } catch (err) {
      show('Failed to load venues', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  const updateVenueStatus = async (id, status) => {
    try {
      const res = await api.put(`/venues/${id}`, { status });
      if (res.data.success) {
        setVenues(prev => prev.map(v => v._id === id ? res.data.data : v));
        show(`Venue ${status} successfully!`);
        return { success: true };
      }
    } catch (err) {
      show('Failed to update venue status', 'danger');
      return { success: false };
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return { venues, loading, refresh: fetchVenues, updateVenueStatus };
}

export function useAdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings');
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      show('Failed to load platform bookings', 'danger');
    } finally {
      setLoading(false);
    }
  }, [show]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, loading, refresh: fetchBookings };
}



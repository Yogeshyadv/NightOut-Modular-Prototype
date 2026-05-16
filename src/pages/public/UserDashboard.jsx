import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { PageHeader, Card, StatCard, Avatar, StatusPill, Button, Icon, EmptyState } from '../../components/ui/index.js';
import { fmt, cn } from '../../utils/helpers.js';

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      setLoading(true);
      try {
        const res = await api.get('/bookings');
        if (res.data.success) {
          // Backend filter should handle this, but double check
          setBookings(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-lg font-black">Syncing your nightlife...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 dark:bg-dark-600 bg-white border dark:border-dark-400 border-light-200 rounded-[40px] shadow-2xl shadow-black/5">
        <Avatar name={user.name} size={100} accent="purple" />
        <div className="text-center md:text-left flex-1">
          <div className="label-xs text-purple-light mb-1 uppercase tracking-widest font-black">Elite Guest</div>
          <h2 className="heading-md mb-2">{user.name}</h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm dark:text-dark-100 text-dark-400 font-medium">
            <div className="flex items-center gap-1.5"><Icon name="mail" size={14} /> {user.email}</div>
            <div className="flex items-center gap-1.5"><Icon name="calendar" size={14} /> Joined {new Date(user.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost-dark" leftIcon="settings">Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="🎫" label="Total Bookings" value={bookings.length} accent="purple" />
        <StatCard icon="💰" label="Total Spent" value={fmt.currency(bookings.reduce((s, b) => s + b.totalPrice, 0))} accent="green" />
        <StatCard icon="⭐" label="Loyalty Points" value="1,250" accent="gold" />
      </div>

      <Card 
        title="My Bookings" 
        subtitle="Manage your upcoming and past reservations"
        action={<Button size="sm" variant="ghost-dark">History →</Button>}
      >
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-3xl dark:bg-dark-500 bg-light-50 border dark:border-dark-400 border-light-200 group hover:dark:border-dark-300 transition-all">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-2xl dark:bg-dark-600 bg-white border dark:border-dark-400 border-light-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎫
                </div>
                <div>
                  <div className="font-black text-lg">{booking.venue?.name || 'Venue'}</div>
                  <div className="text-xs dark:text-dark-100 text-dark-400 font-bold uppercase tracking-wider">
                    {new Date(booking.bookingDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-8">
                <div className="text-right">
                  <div className="text-sm font-black text-green">{fmt.currency(booking.totalPrice)}</div>
                  <div className="text-[10px] dark:text-dark-100 text-dark-400 font-bold">ID: {booking._id.slice(-6).toUpperCase()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusPill status={booking.status === 'upcoming' ? 'Confirmed' : booking.status === 'completed' ? 'Checked In' : 'Cancelled'} />
                  {booking.status === 'upcoming' && (
                    <Button size="xs" variant="purple" leftIcon="qr">View QR</Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {bookings.length === 0 && (
            <div className="py-20">
              <EmptyState 
                icon="🎫" 
                title="No bookings yet" 
                subtitle="Your next big night is waiting. Start exploring venues now!"
              >
                <Button size="md" className="mt-6" onClick={() => navigate('/discovery')}>Explore Venues</Button>
              </EmptyState>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

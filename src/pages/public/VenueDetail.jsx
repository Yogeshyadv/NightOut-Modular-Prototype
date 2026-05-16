import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVenue } from '../../hooks/usePublicVenues';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { Button, Icon, StatCard, Card, Avatar, StatusPill } from '../../components/ui/index.js';
import { useToast } from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { fmt, cn } from '../../utils/helpers.js';

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { venue, loading, error } = useVenue(id);
  const { user } = useAuth();
  const { toasts, show, dismiss } = useToast();
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      show('Please login to book a venue', 'info');
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      const res = await api.post('/bookings', {
        venue: id,
        bookingDate: new Date(),
        totalPrice: venue.basePrice || 1500
      });

      if (res.data.success) {
        show('Booking successful! View it in your profile.', 'success');
        setTimeout(() => navigate('/profile'), 2000);
      }
    } catch (err) {
      show(err.response?.data?.message || 'Booking failed', 'danger');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse">Loading venue details...</div>;
  if (error) return <div className="p-20 text-center text-danger">{error}</div>;
  if (!venue) return <div className="p-20 text-center">Venue not found</div>;

  return (
    <div className="min-h-screen dark:bg-dark-950 bg-light-50 pb-20">
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      
      {/* Hero Header */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={venue.image || 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80'} 
          className="w-full h-full object-cover"
          alt={venue.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex gap-2 mb-4">
                <StatusPill status="Elite" />
                <span className="px-3 py-1 rounded-full bg-green/20 text-green text-[10px] font-black uppercase tracking-widest border border-green/30">Verified</span>
              </div>
              <h1 className="heading-xl text-white mb-2">{venue.name}</h1>
              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-1.5"><Icon name="map-pin" size={14} /> {venue.location}</div>
                <div className="flex items-center gap-1.5 text-gold font-bold">⭐ 4.8 (124 reviews)</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60 text-sm font-medium">Starting from</span>
                <span className="text-2xl font-black text-green">{fmt.currency(venue.basePrice || 1500)}</span>
              </div>
              <Button 
                fullWidth 
                size="xl" 
                loading={bookingLoading}
                onClick={handleBooking}
                rightIcon="arrow"
              >
                Instant Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="heading-sm mb-6">About the Venue</h3>
            <p className="text-lg leading-relaxed dark:text-dark-100 text-dark-500 font-medium">
              {venue.description || "Experience the pinnacle of nightlife in the heart of the city. With state-of-the-art sound systems and a world-class light show, we promise a night like no other."}
            </p>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon="⚡" label="Power" value="98%" accent="purple" />
            <StatCard icon="🎵" label="Sound" value="120dB" accent="green" />
            <StatCard icon="🛡️" label="Safety" value="10/10" accent="info" />
            <StatCard icon="👥" label="Crowd" value="High" accent="gold" />
          </section>

          <section>
            <h3 className="heading-sm mb-6">Venue Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Dress code: Smart Casual / Party Wear",
                "Minimum age: 21+",
                "Government ID required",
                "Club rules apply"
              ].map(rule => (
                <div key={rule} className="flex items-center gap-3 p-4 rounded-2xl dark:bg-dark-600 bg-white border dark:border-dark-400 border-light-200">
                  <Icon name="check-circle" size={16} className="text-green" />
                  <span className="text-sm font-bold">{rule}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card title="Opening Hours" noPad>
            <div className="p-4 space-y-3">
              {['Monday - Thursday', 'Friday - Sunday'].map(day => (
                <div key={day} className="flex justify-between items-center text-sm">
                  <span className="dark:text-dark-100 text-dark-400 font-medium">{day}</span>
                  <span className="font-bold">10 PM - 04 AM</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Location">
             <div className="h-48 dark:bg-dark-600 bg-light-100 rounded-2xl flex items-center justify-center border dark:border-dark-400 border-light-200">
               <div className="text-center">
                 <Icon name="map-pin" size={32} className="text-purple-light mb-2 mx-auto" />
                 <div className="text-xs font-bold px-4">{venue.location}</div>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

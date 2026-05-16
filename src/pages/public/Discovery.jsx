import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePublicVenues } from '../../hooks/usePublicVenues';
import { PageHeader, Card, StatCard, Button, Icon, Avatar } from '../../components/ui/index.js';
import { VenueCard } from '../../components/ui/Cards.jsx';
import { fmt, cn } from '../../utils/helpers.js';

export default function Discovery() {
  const { venues, loading, error } = usePublicVenues();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
        <div className="h-24 shimmer rounded-3xl w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 shimmer rounded-[40px]" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <PageHeader title="Discover Venues" subtitle={`${venues.length} elite clubs and lounges active tonight`} />
        </div>
        <div className="relative group w-full md:w-96">
          <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 group-focus-within:text-green transition-colors" />
          <input 
            type="text"
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl focus:ring-2 focus:ring-green/20 focus:border-green transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVenues.map(venue => (
          <motion.div
            key={venue._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <VenueCard 
              venue={{
                ...venue,
                id: venue._id,
                rating: 4.8,
                reviews: 124,
                tags: ['Elite', 'Live Music'],
                price: `₹${venue.basePrice || 1500}`
              }}
              onAction={() => navigate(`/venue/${venue._id}`)}
              actionLabel="Book Now"
            />
          </motion.div>
        ))}
      </div>

      {filteredVenues.length === 0 && (
        <div className="py-20 text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="heading-sm mb-2">No venues found</h3>
          <p className="dark:text-dark-100 text-dark-400">Try searching for a different city or club name.</p>
        </div>
      )}
    </div>
  );
}

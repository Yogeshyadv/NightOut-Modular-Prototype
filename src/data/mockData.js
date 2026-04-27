// ─────────────────────────────────────────────────────────────────────────────
//  NIGHTOUT — MOCK DATA  (v3.0)
// ─────────────────────────────────────────────────────────────────────────────

// ── Venues ────────────────────────────────────────────────────────────────────
export const VENUES = [
  {
    id: 'VN001',
    vendorId: 'V001',
    name: 'F Bar & Lounge',
    city: 'Jaipur',
    location: 'MI Road, Jaipur',
    category: 'Nightclub',
    emoji: '🎉',
    gradientFrom: '#0d001a',
    gradientTo: '#1e0035',
    status: 'Active',
    capacity: 350,
    stagPrice: 1500,
    couplePrice: 2000,
    femalePrice: 800,
    rating: 4.5,
    reviews: 312,
    bookings: 842,
    monthlyRevenue: 3800000,
    dresscode: 'Smart casual. No shorts, flip-flops or sportswear.',
    includes: '2 complimentary drinks per person',
    openTime: '8:00 PM – 1:00 AM',
    genre: ['EDM', 'Commercial', 'Bollywood'],
    amenities: ['Parking', 'Valet', 'Dance Floor', 'Rooftop', 'Smoking Area'],
    badges: ['Rainbow Verified', 'Women Safe', 'Stag Friendly'],
    crowdLevel: 72,
    djTonight: 'DJ Arjun K',
    created: '2025-10-15',
  },
  {
    id: 'VN002',
    vendorId: 'V001',
    name: 'Skybar 22',
    city: 'Jaipur',
    location: 'Tonk Road, Jaipur',
    category: 'Premium Bar',
    emoji: '🥂',
    gradientFrom: '#1a0f00',
    gradientTo: '#2e1c00',
    status: 'Active',
    capacity: 200,
    stagPrice: 2500,
    couplePrice: 3500,
    femalePrice: 1200,
    rating: 4.8,
    reviews: 521,
    bookings: 621,
    monthlyRevenue: 2900000,
    dresscode: 'Formal / Semi-formal mandatory.',
    includes: 'Unlimited soft beverages',
    openTime: '9:00 PM – 2:00 AM',
    genre: ['House', 'Techno'],
    amenities: ['Valet', 'VIP Lounge', 'Dance Floor'],
    badges: ['Premium', 'VIP Tables'],
    crowdLevel: 88,
    djTonight: 'DJ Rahul Singh',
    created: '2025-11-01',
  },
  {
    id: 'VN003',
    vendorId: 'V002',
    name: 'Neon Terrace',
    city: 'Delhi',
    location: 'Vasant Kunj, Delhi',
    category: 'Rooftop Bar',
    emoji: '🎶',
    gradientFrom: '#001a20',
    gradientTo: '#002a33',
    status: 'Active',
    capacity: 150,
    stagPrice: 1800,
    couplePrice: 2400,
    femalePrice: 700,
    rating: 4.4,
    reviews: 203,
    bookings: 413,
    monthlyRevenue: 1900000,
    dresscode: 'Smart casual.',
    includes: '1 drink token per person',
    openTime: '8:30 PM – 1:30 AM',
    genre: ['Techno', 'Bollywood', 'Cocktails'],
    amenities: ['Rooftop', 'Hookah', 'Parking'],
    badges: ['Ladies Night', 'Rainbow Verified'],
    crowdLevel: 55,
    djTonight: 'DJ Priya',
    created: '2026-01-08',
  },
  {
    id: 'VN004',
    vendorId: 'V002',
    name: 'Pulse Club',
    city: 'Mumbai',
    location: 'Bandra, Mumbai',
    category: 'Nightclub',
    emoji: '🎤',
    gradientFrom: '#1a001a',
    gradientTo: '#300030',
    status: 'Pending',
    capacity: 400,
    stagPrice: 2000,
    couplePrice: 2800,
    femalePrice: 900,
    rating: 0,
    reviews: 0,
    bookings: 0,
    monthlyRevenue: 0,
    dresscode: 'Smart casual.',
    includes: '2 drinks',
    openTime: '9:00 PM – 2:00 AM',
    genre: ['Hip-Hop', 'Live Acts'],
    amenities: ['Parking', 'VIP Lounge'],
    badges: ['Rainbow Verified'],
    crowdLevel: 0,
    djTonight: 'TBD',
    created: '2026-03-01',
  },
];

// ── Bookings ──────────────────────────────────────────────────────────────────
export const BOOKINGS = [
  {
    id: 'NO-2026-84729', guestId: 'U001',
    guest: 'Rahul Sharma',    phone: '+91 98765 43210', email: 'rahul@gmail.com',
    venueId: 'VN001', venue: 'F Bar & Lounge', vendorId: 'V001', city: 'Jaipur',
    type: 'Stag', guests: 1, amount: 1629, commission: 81,
    status: 'Checked In', date: '2026-03-25', time: '9:04 PM', payment: 'UPI',
  },
  {
    id: 'NO-2026-84730', guestId: 'U002',
    guest: 'Priya & Arjun',   phone: '+91 87654 32109', email: 'priya@gmail.com',
    venueId: 'VN001', venue: 'F Bar & Lounge', vendorId: 'V001', city: 'Jaipur',
    type: 'Couple', guests: 2, amount: 2129, commission: 106,
    status: 'Confirmed', date: '2026-03-25', time: '—', payment: 'Card',
  },
  {
    id: 'NO-2026-84731', guestId: 'U003',
    guest: 'Rohan Mehra',     phone: '+91 76543 21098', email: 'rohan@gmail.com',
    venueId: 'VN002', venue: 'Skybar 22', vendorId: 'V001', city: 'Jaipur',
    type: 'Stag', guests: 1, amount: 2629, commission: 131,
    status: 'Checked In', date: '2026-03-25', time: '9:12 PM', payment: 'UPI',
  },
  {
    id: 'NO-2026-84732', guestId: 'U005',
    guest: 'Anjali Singh',    phone: '+91 65432 10987', email: 'anjali@gmail.com',
    venueId: 'VN001', venue: 'F Bar & Lounge', vendorId: 'V001', city: 'Jaipur',
    type: 'Group', guests: 4, amount: 5496, commission: 274,
    status: 'Confirmed', date: '2026-03-25', time: '—', payment: 'UPI',
  },
  {
    id: 'NO-2026-84733', guestId: 'U004',
    guest: 'Dev Kapoor',      phone: '+91 54321 09876', email: 'dev@gmail.com',
    venueId: 'VN003', venue: 'Neon Terrace', vendorId: 'V002', city: 'Delhi',
    type: 'Couple', guests: 2, amount: 2129, commission: 106,
    status: 'No-Show', date: '2026-03-24', time: '—', payment: 'Wallet',
  },
  {
    id: 'NO-2026-84734', guestId: 'U007',
    guest: 'Vikram Singh',    phone: '+91 43210 98765', email: 'vikram@gmail.com',
    venueId: 'VN002', venue: 'Skybar 22', vendorId: 'V001', city: 'Jaipur',
    type: 'Stag', guests: 1, amount: 2629, commission: 131,
    status: 'Checked In', date: '2026-03-24', time: '10:02 PM', payment: 'UPI',
  },
  {
    id: 'NO-2026-84735', guestId: 'U006',
    guest: 'Sana Khan',       phone: '+91 32109 87654', email: 'sana@gmail.com',
    venueId: 'VN001', venue: 'F Bar & Lounge', vendorId: 'V001', city: 'Jaipur',
    type: 'Stag', guests: 1, amount: 1629, commission: 81,
    status: 'Cancelled', date: '2026-03-23', time: '—', payment: 'Card',
  },
  {
    id: 'NO-2026-84736', guestId: 'U003',
    guest: 'Karan Malhotra',  phone: '+91 11111 22222', email: 'karan@gmail.com',
    venueId: 'VN002', venue: 'Skybar 22', vendorId: 'V001', city: 'Jaipur',
    type: 'VIP Table', guests: 6, amount: 28000, commission: 1400,
    status: 'Confirmed', date: '2026-03-27', time: '—', payment: 'Bank Transfer',
  },
  {
    id: 'NO-2026-84737', guestId: 'U001',
    guest: 'Rahul Sharma',    phone: '+91 98765 43210', email: 'rahul@gmail.com',
    venueId: 'VN002', venue: 'Skybar 22', vendorId: 'V001', city: 'Jaipur',
    type: 'Stag', guests: 1, amount: 2629, commission: 131,
    status: 'Confirmed', date: '2026-03-28', time: '—', payment: 'UPI',
  },
  {
    id: 'NO-2026-84738', guestId: 'U002',
    guest: 'Zara Ahmed',      phone: '+91 55566 77788', email: 'zara@gmail.com',
    venueId: 'VN003', venue: 'Neon Terrace', vendorId: 'V002', city: 'Delhi',
    type: 'Couple', guests: 2, amount: 1829, commission: 91,
    status: 'Confirmed', date: '2026-03-27', time: '—', payment: 'UPI',
  },
];

// ── Platform users ─────────────────────────────────────────────────────────────
export const PLATFORM_USERS = [
  { id: 'U001', name: 'Rahul Sharma',  email: 'rahul@gmail.com',  phone: '+91 98765 43210', city: 'Jaipur',    joined: '2026-01-15', bookings: 12, spent: 24800,  status: 'Active',  lastSeen: '2 min ago'  },
  { id: 'U002', name: 'Priya Verma',   email: 'priya@gmail.com',  phone: '+91 87654 32109', city: 'Delhi',     joined: '2026-02-08', bookings:  8, spent: 18400,  status: 'Active',  lastSeen: '1 hr ago'   },
  { id: 'U003', name: 'Arjun Kapoor',  email: 'arjun@gmail.com',  phone: '+91 76543 21098', city: 'Jaipur',    joined: '2025-12-20', bookings: 21, spent: 52100,  status: 'Active',  lastSeen: '3 hr ago'   },
  { id: 'U004', name: 'Meera Joshi',   email: 'meera@gmail.com',  phone: '+91 65432 10987', city: 'Mumbai',    joined: '2026-03-01', bookings:  3, spent:  5400,  status: 'Flagged', lastSeen: '1 day ago'  },
  { id: 'U005', name: 'Dev Kapoor',    email: 'dev@gmail.com',    phone: '+91 54321 09876', city: 'Jaipur',    joined: '2026-01-22', bookings: 15, spent: 31200,  status: 'Active',  lastSeen: '5 hr ago'   },
  { id: 'U006', name: 'Sana Khan',     email: 'sana@gmail.com',   phone: '+91 43210 98765', city: 'Delhi',     joined: '2026-02-18', bookings:  6, spent: 12800,  status: 'Blocked', lastSeen: '5 days ago' },
  { id: 'U007', name: 'Vikram Singh',  email: 'vikram@gmail.com', phone: '+91 32109 87654', city: 'Mumbai',    joined: '2025-11-10', bookings: 34, spent: 78500,  status: 'Active',  lastSeen: '30 min ago' },
  { id: 'U008', name: 'Neha Gupta',    email: 'neha@gmail.com',   phone: '+91 21098 76543', city: 'Jaipur',    joined: '2026-03-10', bookings:  2, spent:  3200,  status: 'Active',  lastSeen: '2 days ago' },
  { id: 'U009', name: 'Ravi Patel',    email: 'ravi@gmail.com',   phone: '+91 11122 33344', city: 'Bengaluru', joined: '2026-03-20', bookings:  1, spent:  1629,  status: 'Active',  lastSeen: '4 hr ago'   },
  { id: 'U010', name: 'Zara Ahmed',    email: 'zara@gmail.com',   phone: '+91 55566 77788', city: 'Hyderabad', joined: '2026-03-22', bookings:  4, spent:  8920,  status: 'Active',  lastSeen: '20 min ago' },
];

// ── Platform vendors ───────────────────────────────────────────────────────────
export const PLATFORM_VENDORS = [
  { id: 'V001', name: 'F Bar & Lounge',  owner: 'Amit Kumar',     email: 'amit@fbar.in',      phone: '+91 98765 00001', city: 'Jaipur',    joined: '2025-10-15', status: 'Active',  venues: 2, bookings: 1463, revenue: 6700000, commission: 335000, rating: 4.6 },
  { id: 'V002', name: 'Sky Hospitality', owner: 'Rohan Mehra',    email: 'rohan@skyhosp.in',  phone: '+91 98765 00002', city: 'Delhi',     joined: '2025-11-03', status: 'Active',  venues: 1, bookings:  621, revenue: 2900000, commission: 145000, rating: 4.3 },
  { id: 'V003', name: 'Apex Nightlife',  owner: 'Priya Shah',     email: 'priya@apexnl.in',   phone: '+91 98765 00003', city: 'Mumbai',    joined: '2025-12-20', status: 'Pending', venues: 0, bookings:    0, revenue:       0, commission:      0, rating:   0 },
  { id: 'V004', name: 'Pulse Events',    owner: 'Karan Malhotra', email: 'karan@pulse.in',    phone: '+91 98765 00004', city: 'Jaipur',    joined: '2026-01-08', status: 'Active',  venues: 3, bookings:  413, revenue: 1900000, commission:  95000, rating: 4.7 },
  { id: 'V005', name: 'Nightlife Co.',   owner: 'Anjali Rao',     email: 'anjali@nlco.in',    phone: '+91 98765 00005', city: 'Bengaluru', joined: '2026-02-14', status: 'Blocked', venues: 1, bookings:   89, revenue:  420000, commission:  21000, rating: 3.2 },
  { id: 'V006', name: 'Premier Clubs',   owner: 'Siddharth Nair', email: 'sid@premier.in',    phone: '+91 98765 00006', city: 'Chennai',   joined: '2026-03-01', status: 'Pending', venues: 0, bookings:    0, revenue:       0, commission:      0, rating:   0 },
  { id: 'V007', name: 'Neon Collective', owner: 'Meera Pillai',   email: 'meera@neon.in',     phone: '+91 98765 00007', city: 'Hyderabad', joined: '2026-03-15', status: 'Active',  venues: 2, bookings:  234, revenue: 1100000, commission:  55000, rating: 4.4 },
];

// ── Revenue charts ─────────────────────────────────────────────────────────────
export const REVENUE_DAILY = [
  { day: 'Mon', revenue: 28000,  bookings: 14, commission: 1400 },
  { day: 'Tue', revenue: 45000,  bookings: 22, commission: 2250 },
  { day: 'Wed', revenue: 32000,  bookings: 16, commission: 1600 },
  { day: 'Thu', revenue: 61000,  bookings: 30, commission: 3050 },
  { day: 'Fri', revenue: 88000,  bookings: 44, commission: 4400 },
  { day: 'Sat', revenue: 95000,  bookings: 48, commission: 4750 },
  { day: 'Sun', revenue: 72000,  bookings: 36, commission: 3600 },
];

export const REVENUE_MONTHLY = [
  { month: 'Oct', revenue: 3200000, bookings: 1600 },
  { month: 'Nov', revenue: 4100000, bookings: 2050 },
  { month: 'Dec', revenue: 3800000, bookings: 1900 },
  { month: 'Jan', revenue: 5600000, bookings: 2800 },
  { month: 'Feb', revenue: 6200000, bookings: 3100 },
  { month: 'Mar', revenue: 4900000, bookings: 2450 },
];

export const ADMIN_REVENUE_DAILY = [
  { day: '1',  revenue:  82000, commission:  4100 },
  { day: '3',  revenue:  95000, commission:  4750 },
  { day: '5',  revenue: 140000, commission:  7000 },
  { day: '7',  revenue: 110000, commission:  5500 },
  { day: '9',  revenue: 168000, commission:  8400 },
  { day: '11', revenue: 195000, commission:  9750 },
  { day: '13', revenue: 152000, commission:  7600 },
  { day: '15', revenue: 218000, commission: 10900 },
  { day: '17', revenue: 176000, commission:  8800 },
  { day: '19', revenue: 231000, commission: 11550 },
  { day: '21', revenue: 198000, commission:  9900 },
  { day: '23', revenue: 245000, commission: 12250 },
  { day: '25', revenue: 280000, commission: 14000 },
];

// ── Testimonials & FAQ ─────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: 'Arjun Kapoor',  city: 'Jaipur', role: 'Regular User',        rating: 5, avatar: 'AK', text: 'NightOut completely changed how I plan my weekends. Booking is instant, QR check-in is seamless, and I always know the crowd before I go.' },
  { name: 'Priya Sharma',  city: 'Delhi',  role: 'LGBTQ+ Community',    rating: 5, avatar: 'PS', text: 'The Rainbow Verified badge gives me confidence. I finally found venues where I feel genuinely welcome — not just tolerated.' },
  { name: 'Amit Kumar',    city: 'Jaipur', role: 'Club Owner',          rating: 5, avatar: 'AK', text: 'As a vendor, the dashboard is incredible. I can update pricing, view bookings, and scan QR codes from my phone. Revenue is up 40%.' },
  { name: 'Vikram Singh',  city: 'Mumbai', role: 'Gold Member',         rating: 5, avatar: 'VS', text: 'The Gold membership pays for itself in one weekend. Priority entry, exclusive deals, and a dedicated support line.' },
];

export const FAQ_ITEMS = [
  { q: 'How does QR check-in work?',         a: 'After booking, you receive a unique QR code via SMS and email. At the venue, the bouncer scans it — check-in takes under 2 seconds and works completely offline.' },
  { q: 'What is the cancellation policy?',    a: 'Free cancellation up to 4 hours before your booking time. Your ₹99 deposit is refunded as NightOut credit, usable on any future booking.' },
  { q: 'How do I list my venue?',             a: 'Register as a vendor, complete venue verification (2–4 hrs), and your listing goes live within 24 hours after admin approval.' },
  { q: 'Is NightOut available in my city?',   a: 'Currently live in Jaipur, Delhi, Mumbai, Bengaluru. Expanding to Chennai, Hyderabad, Pune, and Kolkata by Q3 2026.' },
  { q: 'How is Rainbow Verified status earned?', a: 'Venues earn Rainbow Verified by completing our inclusivity audit: staff sensitivity training, gender-neutral facilities, and signing our non-discrimination policy.' },
  { q: 'What is NightOut Gold?',              a: 'Gold is our premium subscription (₹299/mo) for frequent guests: priority entry, 10% cashback, exclusive deals, and a dedicated support line.' },
];

// ── Activity / moderation ──────────────────────────────────────────────────────
export const ACTIVITY_LOG = [
  { type: 'booking', msg: 'New booking: Rahul Sharma at F Bar & Lounge',       time: '2 min ago',   color: '#00C853' },
  { type: 'vendor',  msg: 'Vendor approval request: Apex Nightlife (Mumbai)',   time: '8 min ago',   color: '#FFD740' },
  { type: 'user',    msg: 'User flagged: Meera Joshi (suspicious activity)',    time: '15 min ago',  color: '#FF5252' },
  { type: 'booking', msg: 'High-value booking ₹28,000: Skybar 22 VIP Table',   time: '23 min ago',  color: '#00C853' },
  { type: 'system',  msg: 'Auto-backup completed successfully',                 time: '1 hr ago',    color: '#00E5FF' },
  { type: 'venue',   msg: 'Venue update pending review: Pulse Club',            time: '1.5 hr ago',  color: '#9C6FFF' },
  { type: 'user',    msg: 'New user registered: Zara Ahmed (Hyderabad)',        time: '2 hr ago',    color: '#00E5FF' },
  { type: 'vendor',  msg: 'Revenue milestone: F Bar crossed ₹38L this month',  time: '3 hr ago',    color: '#FFD740' },
  { type: 'booking', msg: 'Weekend record: 285 bookings on Saturday',           time: '1 day ago',   color: '#00C853' },
  { type: 'system',  msg: 'Commission payout processed: Pulse Events ₹95K',    time: '1 day ago',   color: '#FFD740' },
];

export const MODERATION_ITEMS = [
  { id: 'M001', vendorName: 'Apex Nightlife',  venue: 'Apex Club Mumbai',   type: 'Venue Description', status: 'Pending',  submitted: '2 hr ago',   content: 'Premium nightclub with world-class DJs, a stunning city view, and 3 fully-stocked bars. Capacity 350, smart casual dress.' },
  { id: 'M002', vendorName: 'Pulse Events',    venue: 'Neon Terrace',       type: 'Image Upload',      status: 'Pending',  submitted: '4 hr ago',   content: '4 new venue photos: exterior, dance floor, bar area, VIP section.' },
  { id: 'M003', vendorName: 'Sky Hospitality', venue: 'Sky Lounge Delhi',   type: 'Pricing Update',    status: 'Approved', submitted: '1 day ago',  content: 'Saturday stag: ₹2,000 → ₹2,500. Couple: ₹2,800 → ₹3,200.' },
  { id: 'M004', vendorName: 'F Bar & Lounge',  venue: 'F Bar & Lounge',     type: 'Event Creation',    status: 'Approved', submitted: '1 day ago',  content: 'EDM Saturdays · DJ Arjun K · 29 Mar · ₹1,500 general admission.' },
  { id: 'M005', vendorName: 'Nightlife Co.',   venue: 'Club X Bengaluru',   type: 'Venue Description', status: 'Rejected', submitted: '2 days ago', content: 'Claims 500+ capacity. Actual listed capacity: 180. Flagged as misleading.' },
];

// ── Pricing plans ──────────────────────────────────────────────────────────────
export const PRICING_PLANS = [
  {
    id: 'starter', name: 'Starter', monthlyPrice: 0, annualPrice: 0,
    badge: null, highlight: false,
    desc: 'Perfect for new venues just getting started on NightOut.',
    features: [
      { text: '1 venue listing', included: true },
      { text: 'Up to 50 bookings / month', included: true },
      { text: 'Basic guestlist management', included: true },
      { text: 'QR check-in', included: true },
      { text: 'Email support', included: true },
      { text: 'Dynamic pricing', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free', ctaVariant: 'ghost-dark', commissionRate: 7,
  },
  {
    id: 'growth', name: 'Growth', monthlyPrice: 2999, annualPrice: 2399,
    badge: 'Most Popular', highlight: true,
    desc: 'For growing venues ready to scale bookings and revenue.',
    features: [
      { text: '3 venue listings', included: true },
      { text: 'Unlimited bookings', included: true },
      { text: 'Advanced guestlist tools', included: true },
      { text: 'QR check-in + offline mode', included: true },
      { text: 'Priority support', included: true },
      { text: 'Dynamic pricing', included: true },
      { text: 'Full analytics dashboard', included: true },
      { text: 'API access', included: false },
    ],
    cta: 'Start Growth', ctaVariant: 'primary', commissionRate: 5,
  },
  {
    id: 'premium', name: 'Premium', monthlyPrice: 7999, annualPrice: 6399,
    badge: null, highlight: false,
    desc: 'Full platform for chains, premium venues, and multi-city operators.',
    features: [
      { text: 'Unlimited venue listings', included: true },
      { text: 'Unlimited bookings', included: true },
      { text: 'Custom analytics & reports', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: '24 / 7 phone support', included: true },
      { text: 'Dynamic pricing + AI optimizer', included: true },
      { text: 'Full analytics + export', included: true },
      { text: 'API access', included: true },
    ],
    cta: 'Contact Sales', ctaVariant: 'ghost-dark', commissionRate: 3,
  },
];

// ── Top venues (for admin dashboard) ──────────────────────────────────────────
export const TOP_VENUES = [
  { name: 'F Bar & Lounge', city: 'Jaipur',    revenue: '₹38L', bookings: 842, rating: 4.5, trend: '+23%', trendUp: true  },
  { name: 'Skybar 22',      city: 'Jaipur',    revenue: '₹29L', bookings: 621, rating: 4.8, trend: '+18%', trendUp: true  },
  { name: 'Pulse Club',     city: 'Jaipur',    revenue: '₹19L', bookings: 413, rating: 4.7, trend: '+31%', trendUp: true  },
  { name: 'Neon Lounge',    city: 'Delhi',     revenue: '₹14L', bookings: 298, rating: 4.3, trend: '+12%', trendUp: true  },
  { name: 'Beat Factory',   city: 'Mumbai',    revenue: '₹11L', bookings: 234, rating: 4.4, trend:  '-3%', trendUp: false },
];

// ── Extra exports used by vendor Settings ─────────────────────────────────────
export const VENDOR_INFO = {
  id: 'V001',
  name: 'Amit Kumar',
  email: 'amit@fbar.in',
  phone: '+91 98765 00001',
  businessName: 'F Bar & Lounge',
  city: 'Jaipur',
  address: 'MI Road, Jaipur, Rajasthan 302001',
  joined: 'Oct 2025',
  plan: 'Premium',
  commissionRate: 5,
  totalVenues: 2,
  rating: 4.5,
};

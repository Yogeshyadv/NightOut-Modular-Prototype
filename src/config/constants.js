// ─────────────────────────────────────────────────────────────────────────────
//  Global Application Constants
// ─────────────────────────────────────────────────────────────────────────────

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    desc: 'Perfect for small lounges and boutique bars looking to start their digital journey.',
    commissionRate: 7,
    features: [
      { text: '1 Venue Listing', included: true },
      { text: '50 Monthly Bookings', included: true },
      { text: 'Standard QR Check-in', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Dynamic Pricing', included: false },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    ctaVariant: 'ghost-dark',
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 4999,
    annualPrice: 3999,
    badge: 'Most Popular',
    desc: 'The ideal choice for high-volume nightclubs and event organizers.',
    commissionRate: 5,
    features: [
      { text: 'Up to 3 Venue Listings', included: true },
      { text: 'Unlimited Bookings', included: true },
      { text: 'Prism QR Technology', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Dynamic Pricing', included: true },
      { text: 'Priority Support', included: true },
    ],
    cta: 'Scale Now',
    ctaVariant: 'green',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyPrice: 14999,
    annualPrice: 11999,
    desc: 'Enterprise-grade features for multi-city chains and mega venues.',
    commissionRate: 3,
    features: [
      { text: 'Unlimited Venues', included: true },
      { text: 'Unlimited Bookings', included: true },
      { text: 'Custom White-label QR', included: true },
      { text: 'API Access & Webhooks', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: '24/7 Phone Support', included: true },
    ],
    cta: 'Contact Sales',
    ctaVariant: 'ghost-dark',
    highlight: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Anjali Sharma',
    role: 'Clubber · Bangalore',
    text: 'NightOut changed how I plan my weekends. No more waiting at the door or calling for guestlists. The QR entry is like magic.',
    rating: 5,
    avatar: 'AS'
  },
  {
    name: 'Vikram Singh',
    role: 'Owner · Prism Nightclub',
    text: 'The vendor dashboard gives us real-time visibility into our crowd. The data has helped us optimize our entry pricing significantly.',
    rating: 5,
    avatar: 'VS'
  },
  {
    name: 'Rohan Mehra',
    role: 'Event Promoter',
    text: 'Fastest check-in system I have ever used. Handled our 2000+ guest event without a single glitch or network issue.',
    rating: 5,
    avatar: 'RM'
  },
  {
    name: 'Sara Khan',
    role: 'Verified Guest',
    text: 'I love the safety features. Sharing my live location with friends directly from the ticket view makes me feel much more secure.',
    rating: 5,
    avatar: 'SK'
  }
];

export const FAQ_ITEMS = [
  {
    q: "How does the QR check-in work?",
    a: "Once you book, a secure QR code is generated. At the venue, simply show this to the bouncer. Our scanner app works offline, so you don't need internet at the club door."
  },
  {
    q: "Is my payment secure?",
    a: "Absolutely. We use industry-standard encryption and partner with India's leading payment gateways (UPI, Cards, Wallets) to ensure 100% secure transactions."
  },
  {
    q: "Can I cancel my booking?",
    a: "Cancellation policies vary by venue. Typically, you can cancel up to 4 hours before the event for a full or partial refund. Check the venue's specific policy on the booking page."
  },
  {
    q: "What is Rainbow Verification?",
    a: "It's our certification for LGBTQ+ inclusive venues. These venues have trained staff and a commitment to providing a safe, equal environment for everyone."
  }
];

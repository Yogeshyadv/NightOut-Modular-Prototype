const Booking = require('../models/Booking');
const Venue = require('../models/Venue');
const User = require('../models/User');
const mongoose = require('mongoose');


// @desc    Get vendor dashboard stats
// @route   GET /api/analytics/vendor
// @access  Private (Vendor)
exports.getVendorStats = async (req, res, next) => {
  try {
    const vendorId = req.user.id;

    // 1. Get all venues owned by the vendor
    const venues = await Venue.find({ owner: vendorId });
    const venueIds = venues.map(v => v._id);

    // 2. Get bookings for these venues
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayBookings = await Booking.find({
      venue: { $in: venueIds },
      bookingDate: { $gte: startOfDay, $lte: endOfDay }
    });

    const stats = {
      todayCount: todayBookings.length,
      todayRevenue: todayBookings.reduce((sum, b) => sum + b.totalPrice, 0),
      checkedInToday: todayBookings.filter(b => b.status === 'completed').length,
      upcomingToday: todayBookings.filter(b => b.status === 'upcoming').length,
      cancelledToday: todayBookings.filter(b => b.status === 'cancelled').length,
      
      // Recent bookings (last 5)
      recentBookings: await Booking.find({ venue: { $in: venueIds } })
        .sort('-createdAt')
        .limit(5)
        .populate('venue user'),

      // Venue-specific stats
      venueStats: await Promise.all(venues.map(async (v) => {
        const venueBookings = await Booking.find({ venue: v._id });
        return {
          _id: v._id,
          name: v.name,
          location: v.location,
          status: v.status,
          totalBookings: venueBookings.length,
          totalRevenue: venueBookings.reduce((sum, b) => sum + b.totalPrice, 0),
          rating: 4.5, // Mock for now
        };
      })),

      // Chart data (last 7 days)
      weeklyStats: await getWeeklyStats(venueIds)
    };

    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Helper for weekly aggregation
async function getWeeklyStats(venueIds) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const stats = await Booking.aggregate([
    {
      $match: {
        venue: { $in: venueIds },
        bookingDate: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
        revenue: { $sum: "$totalPrice" },
        bookings: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  // Fill in missing days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];
    
    const existing = stats.find(s => s._id === dateStr);
    result.push({
      day: dayName,
      revenue: existing ? existing.revenue : 0,
      bookings: existing ? existing.bookings : 0
    });
  }
  return result;
}

// @desc    Get admin dashboard stats
// @route   GET /api/analytics/admin
// @access  Private (Admin)
exports.getAdminStats = async (req, res, next) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments({ role: 'user' }),
      totalVendors: await User.countDocuments({ role: 'vendor' }),
      totalVenues: await Venue.countDocuments(),
      totalBookings: await Booking.countDocuments(),
      totalRevenue: (await Booking.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]))[0]?.total || 0,
      
      pendingVenues: await Venue.countDocuments({ status: 'pending' }),
      
      // City breakdown
      revenueByCity: await Booking.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $lookup: { from: 'venues', localField: 'venue', foreignField: '_id', as: 'venueInfo' } },
        { $unwind: "$venueInfo" },
        { $group: { _id: "$venueInfo.location", revenue: { $sum: "$totalPrice" } } },
        { $sort: { revenue: -1 } }
      ]),

      // Top venues
      topVenues: await Booking.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $lookup: { from: 'venues', localField: 'venue', foreignField: '_id', as: 'venueInfo' } },
        { $unwind: "$venueInfo" },
        { $group: { 
            _id: "$venue", 
            name: { $first: "$venueInfo.name" }, 
            city: { $first: "$venueInfo.location" },
            revenue: { $sum: "$totalPrice" },
            bookings: { $sum: 1 }
        }},
        { $sort: { revenue: -1 } },
        { $limit: 5 }
      ]),
      
      // Weekly platform growth (last 7 days)
      weeklyGrowth: await getAdminWeeklyStats(),

      recentActivity: await Booking.find()
        .sort('-createdAt')
        .limit(8)
        .populate('venue user')
    };

    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

async function getAdminWeeklyStats() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const stats = await Booking.aggregate([
    {
      $match: {
        bookingDate: { $gte: sevenDaysAgo }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
        revenue: { $sum: "$totalPrice" },
        bookings: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];
    
    const existing = stats.find(s => s._id === dateStr);
    result.push({
      day: dayName,
      revenue: existing ? existing.revenue : 0,
      bookings: existing ? existing.bookings : 0
    });
  }
  return result;
}



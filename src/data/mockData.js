import { T } from '../theme/tokens';

export const users = [
  {id:"U001",name:"Rahul Sharma",phone:"+91 98765 43210",email:"rahul.s@gmail.com",city:"Jaipur",joined:"Jan 2026",bookings:12,status:"Active",spent:24800,avatar:"RS"},
  {id:"U002",name:"Priya Verma",phone:"+91 87654 32109",email:"priya.v@gmail.com",city:"Delhi",joined:"Feb 2026",bookings:8,status:"Active",spent:18400,avatar:"PV"},
  {id:"U003",name:"Arjun Kapoor",phone:"+91 76543 21098",email:"arjun.k@gmail.com",city:"Jaipur",joined:"Dec 2025",bookings:21,status:"Active",spent:52100,avatar:"AK"},
  {id:"U004",name:"Meera Joshi",phone:"+91 65432 10987",email:"meera.j@gmail.com",city:"Mumbai",joined:"Mar 2026",bookings:3,status:"Flagged",spent:5400,avatar:"MJ"},
  {id:"U005",name:"Dev Kapoor",phone:"+91 54321 09876",email:"dev.k@gmail.com",city:"Jaipur",joined:"Jan 2026",bookings:15,status:"Active",spent:31200,avatar:"DK"},
  {id:"U006",name:"Sana Khan",phone:"+91 43210 98765",email:"sana.k@gmail.com",city:"Delhi",joined:"Feb 2026",bookings:6,status:"Blocked",spent:12800,avatar:"SK"},
  {id:"U007",name:"Vikram Singh",phone:"+91 32109 87654",email:"vikram.s@gmail.com",city:"Mumbai",joined:"Nov 2025",bookings:34,status:"Active",spent:78500,avatar:"VS"},
  {id:"U008",name:"Neha Gupta",phone:"+91 21098 76543",email:"neha.g@gmail.com",city:"Jaipur",joined:"Mar 2026",bookings:2,status:"Active",spent:3200,avatar:"NG"},
];

export const vendors = [
  {id:"V001",name:"F Bar & Lounge",owner:"Amit Kumar",city:"Jaipur",email:"amit@fbar.in",phone:"+91 98765 00001",joined:"Oct 2025",status:"Active",totalBookings:842,revenue:3800000,commission:190000,rating:4.5,venues:2},
  {id:"V002",name:"Sky Hospitality",owner:"Rohan Mehra",city:"Delhi",email:"rohan@skyhosp.in",phone:"+91 98765 00002",joined:"Nov 2025",status:"Active",totalBookings:621,revenue:2900000,commission:145000,rating:4.3,venues:1},
  {id:"V003",name:"Apex Nightlife",city:"Mumbai",owner:"Priya Shah",email:"priya@apexnl.in",phone:"+91 98765 00003",joined:"Dec 2025",status:"Pending",totalBookings:0,revenue:0,commission:0,rating:0,venues:0},
  {id:"V004",name:"Pulse Events",owner:"Karan Malhotra",city:"Jaipur",email:"karan@pulse.in",phone:"+91 98765 00004",joined:"Jan 2026",status:"Active",totalBookings:413,revenue:1900000,commission:95000,rating:4.7,venues:3},
  {id:"V005",name:"Nightlife Co.",owner:"Anjali Rao",city:"Bengaluru",email:"anjali@nlco.in",phone:"+91 98765 00005",joined:"Feb 2026",status:"Blocked",totalBookings:89,revenue:420000,commission:21000,rating:3.2,venues:1},
  {id:"V006",name:"Premier Clubs",owner:"Siddharth Nair",city:"Chennai",email:"sid@premier.in",phone:"+91 98765 00006",joined:"Mar 2026",status:"Pending",totalBookings:0,revenue:0,commission:0,rating:0,venues:0},
];

export const venues = [
  {id:"VN001",name:"F Bar & Lounge",vendor:"V001",location:"MI Road, Jaipur",distance:"2.1 km",rating:4.5,reviews:312,emoji:"🎉",gradient:"linear-gradient(135deg,#0d001a,#1e0035,#080012)",genre:["EDM","Stag Friendly","Rooftop"],stagPrice:1500,couplePrice:2000,femalePrice:800,crowdLevel:72,crowdLabel:"Buzzing",crowdColor:T.gold,djTonight:"DJ Arjun K",badges:["Stag Friendly","Rainbow","Women Safe"],openTime:"8:00 PM – 1:00 AM",dressCode:"Smart casual",includes:"2 complimentary drinks",featured:true,status:"Active"},
  {id:"VN002",name:"Fizz Rooftop Bar",vendor:"V002",location:"C-Scheme, Jaipur",distance:"3.4 km",rating:4.3,reviews:187,emoji:"🌃",gradient:"linear-gradient(135deg,#001108,#001f10,#000a04)",genre:["Bollywood","Couples","Hookah"],stagPrice:1200,couplePrice:1800,femalePrice:600,crowdLevel:45,crowdLabel:"Moderate",crowdColor:T.green,djTonight:"DJ Priya",badges:["Couples","Rooftop"],openTime:"7:30 PM – 12:30 AM",dressCode:"Smart casual",includes:"1 welcome drink",featured:true,status:"Active"},
  {id:"VN003",name:"Skybar 22",vendor:"V001",location:"Tonk Road, Jaipur",distance:"5.2 km",rating:4.8,reviews:521,emoji:"🥂",gradient:"linear-gradient(135deg,#1a0f00,#2e1c00,#0d0800)",genre:["House","VIP Tables","Premium"],stagPrice:2500,couplePrice:3500,femalePrice:1200,crowdLevel:88,crowdLabel:"Packed",crowdColor:T.red,djTonight:"DJ Rahul Singh",badges:["VIP Tables","Premium"],openTime:"9:00 PM – 2:00 AM",dressCode:"Formal mandatory",includes:"Unlimited soft drinks",featured:true,status:"Active"},
  {id:"VN004",name:"Neon Terrace",vendor:"V004",location:"Vaishali Nagar, Jaipur",distance:"4.1 km",rating:4.4,reviews:203,emoji:"🎶",gradient:"linear-gradient(135deg,#001a20,#002a33,#000d10)",genre:["Techno","Ladies Night","Cocktails"],stagPrice:1800,couplePrice:2400,femalePrice:700,crowdLevel:60,crowdLabel:"Getting Busy",crowdColor:T.gold,djTonight:"DJ Meera",badges:["Ladies Night","Rainbow"],openTime:"8:30 PM – 1:30 AM",dressCode:"Smart casual",includes:"1 drink token",featured:false,status:"Active"},
  {id:"VN005",name:"Pulse Club",vendor:"V004",location:"Tonk Road, Jaipur",distance:"6.3 km",rating:4.6,reviews:289,emoji:"🎤",gradient:"linear-gradient(135deg,#1a001a,#300030,#0d000d)",genre:["Hip-Hop","LGBTQ+","Live Acts"],stagPrice:2000,couplePrice:2800,femalePrice:900,crowdLevel:55,crowdLabel:"Moderate",crowdColor:T.green,djTonight:"DJ Zara",badges:["Rainbow","VIP"],openTime:"9:00 PM – 2:00 AM",dressCode:"Smart casual",includes:"2 drinks",featured:false,status:"Pending"},
];

export const bookings = [
  {id:"NO-2026-84729",userId:"U001",vendorId:"V001",venueId:"VN001",guest:"Rahul Sharma",status:"Checked In",venue:"F Bar & Lounge",city:"Jaipur",type:"Stag",guests:1,amount:1629,date:"25 Mar 2026",time:"9:04 PM",paymentMethod:"UPI",commission:81},
  {id:"NO-2026-84730",userId:"U002",vendorId:"V001",venueId:"VN001",guest:"Priya & Arjun",status:"Confirmed",venue:"F Bar & Lounge",city:"Jaipur",type:"Couple",guests:2,amount:2129,date:"25 Mar 2026",time:"—",paymentMethod:"Card",commission:106},
  {id:"NO-2026-84731",userId:"U003",vendorId:"V002",venueId:"VN002",guest:"Rohan Mehra",status:"Checked In",venue:"Fizz Rooftop Bar",city:"Jaipur",type:"Stag",guests:1,amount:1329,date:"25 Mar 2026",time:"9:12 PM",paymentMethod:"UPI",commission:66},
  {id:"NO-2026-84732",userId:"U005",vendorId:"V001",venueId:"VN001",guest:"Anjali Singh & Group",status:"Confirmed",venue:"F Bar & Lounge",city:"Jaipur",type:"Group",guests:4,amount:5496,date:"25 Mar 2026",time:"—",paymentMethod:"UPI",commission:274},
  {id:"NO-2026-84733",userId:"U004",vendorId:"V002",venueId:"VN002",guest:"Meera Joshi",status:"No-Show",venue:"Fizz Rooftop Bar",city:"Jaipur",type:"Couple",guests:2,amount:1829,date:"25 Mar 2026",time:"—",paymentMethod:"Wallet",commission:91},
  {id:"NO-2026-84734",userId:"U007",vendorId:"V004",venueId:"VN004",guest:"Vikram Singh",status:"Checked In",venue:"Neon Terrace",city:"Jaipur",type:"Stag",guests:1,amount:1929,date:"25 Mar 2026",time:"10:02 PM",paymentMethod:"UPI",commission:96},
  {id:"NO-2026-84735",userId:"U008",vendorId:"V001",venueId:"VN003",guest:"Neha Gupta",status:"Confirmed",venue:"Skybar 22",city:"Jaipur",type:"Couple",guests:2,amount:3629,date:"25 Mar 2026",time:"—",paymentMethod:"Card",commission:181},
  {id:"NO-2026-84736",userId:"U003",vendorId:"V004",venueId:"VN005",guest:"Arjun Kapoor",status:"Pending",venue:"Pulse Club",city:"Jaipur",type:"Stag",guests:3,amount:5487,date:"25 Mar 2026",time:"—",paymentMethod:"UPI",commission:274},
];

export const activity = [
  {time:"2 min ago",type:"booking",msg:"New booking: Rahul Sharma at F Bar & Lounge",color:T.green},
  {time:"8 min ago",type:"vendor",msg:"Vendor approval request: Apex Nightlife (Mumbai)",color:T.gold},
  {time:"15 min ago",type:"user",msg:"User flagged for suspicious activity: Meera Joshi",color:T.red},
  {time:"23 min ago",type:"booking",msg:"High-value booking: ₹5,496 at F Bar & Lounge",color:T.green},
  {time:"31 min ago",type:"venue",msg:"Venue update submitted: Pulse Club (review pending)",color:T.purple2},
  {time:"45 min ago",type:"booking",msg:"No-show recorded: Fizz Rooftop Bar",color:T.orange},
  {time:"1 hr ago",type:"user",msg:"New user registered: Neha Gupta (Jaipur)",color:T.cyan},
  {time:"1.5 hr ago",type:"vendor",msg:"Revenue milestone: F Bar crossed ₹38L this month",color:T.gold},
];

export const analyticsData = {
  revenueDaily:[28,45,32,61,88,95,72,54,68,82,91,78,103,115,92,87,110,128,95,143,121,108,135,152,118,99,128,165,142,158],
  revenueWeekly:[3.2,4.1,3.8,5.6,6.2,5.4,4.9,6.8,7.2,6.5,7.8,8.1],
  topVenues:[
    {name:"F Bar & Lounge",city:"Jaipur",revenue:"₹38L",bookings:842,rating:4.5,trend:"+23%"},
    {name:"Skybar 22",city:"Jaipur",revenue:"₹29L",bookings:621,rating:4.8,trend:"+18%"},
    {name:"Neon Terrace",city:"Jaipur",revenue:"₹19L",bookings:413,rating:4.4,trend:"+31%"},
    {name:"Fizz Rooftop",city:"Jaipur",revenue:"₹14L",bookings:298,rating:4.3,trend:"+12%"},
    {name:"Pulse Club",city:"Jaipur",revenue:"₹9L",bookings:189,rating:4.6,trend:"+41%"},
  ],
  kpis: {
    totalBookings: 842,
    checkinRate: "91%",
    estRevenue: "₹38L",
    avgRating: "4.5",
  }
};

export const userBookings = [
  {id:"NO-2026-84729",venue:"F Bar & Lounge",emoji:"🎉",gradient:"linear-gradient(135deg,#0d001a,#1e0035)",date:"Tue, 25 Mar 2026",time:"9:00 PM",type:"Guestlist · Stag",guests:1,amount:1629,status:"upcoming"},
  {id:"NO-2026-84728",venue:"Fizz Rooftop Bar",emoji:"🌃",gradient:"linear-gradient(135deg,#001108,#001f10)",date:"Sat, 29 Mar 2026",time:"8:30 PM",type:"Guestlist · Couple",guests:2,amount:2129,status:"upcoming"},
  {id:"NO-2026-84710",venue:"Skybar 22",emoji:"🥂",gradient:"linear-gradient(135deg,#1a0f00,#2e1c00)",date:"Sat, 15 Mar 2026",time:"9:00 PM",type:"Guestlist · Stag",guests:1,amount:2629,status:"past"},
  {id:"NO-2026-84700",venue:"Neon Terrace",emoji:"🎶",gradient:"linear-gradient(135deg,#001a20,#002a33)",date:"Fri, 7 Mar 2026",time:"8:00 PM",type:"Guestlist · Couple",guests:2,amount:2129,status:"past"},
];

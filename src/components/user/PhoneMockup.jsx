import React, { useState, useCallback } from 'react';
import { T } from '../../theme/tokens';
import { venues } from '../../data/mockData';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { VenueDetailScreen } from './screens/VenueDetailScreen';
import { BookingScreen } from './screens/BookingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { QRScreen } from './screens/QRScreen';
import { BookingsScreen } from './screens/BookingsScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export const PhoneMockup = () => {
  const [screen, setScreen] = useState("splash");
  const [venue, setVenue] = useState(venues[0]);
  const nav = useCallback(s => setScreen(s), []);
  const screens = ["splash", "login", "home", "search", "venue", "booking", "payment", "qr", "bookings", "favorites", "profile"];
  const renderScreen = () => {
    const p = { navigate: nav, venue, setVenue };
    const map = { splash: <SplashScreen {...p} />, login: <LoginScreen {...p} />, home: <HomeScreen {...p} />, search: <SearchScreen {...p} />, venue: <VenueDetailScreen {...p} />, booking: <BookingScreen {...p} />, payment: <PaymentScreen {...p} />, qr: <QRScreen {...p} />, bookings: <BookingsScreen {...p} />, favorites: <FavoritesScreen {...p} />, profile: <ProfileScreen {...p} /> };
    return map[screen] || map.home;
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, flexShrink: 0 }}>
      <div style={{ width: 390, height: 844, background: "#080808", borderRadius: 54, border: "1.5px solid rgba(255,255,255,0.12)", boxShadow: "0 0 0 8px rgba(255,255,255,0.02),0 60px 120px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,255,255,0.08),0 0 80px rgba(0,200,83,0.06)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 126, height: 36, background: "#000", borderRadius: 20, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, background: "#1a1a1a", borderRadius: "50%", border: "1px solid #2a2a2a" }} />
          <div style={{ width: 44, height: 8, background: "#1a1a1a", borderRadius: 6 }} />
          <div style={{ width: 10, height: 10, background: "#1a1a1a", borderRadius: "50%", border: "1px solid #2a2a2a" }} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 28px 8px", fontSize: 12, fontWeight: 600, zIndex: 100, pointerEvents: "none" }}>
          <span>9:41</span><span style={{ fontSize: 11 }}>▐▐▐ WiFi 🔋</span>
        </div>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{renderScreen()}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 420 }}>
        {screens.map(s => (
          <button key={s} onClick={() => setScreen(s)} style={{ padding: "6px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: screen === s ? T.green : T.t3, background: screen === s ? T.greenGlow : T.glass, border: `1px solid ${screen === s ? T.green : T.border}`, cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.2s", textTransform: "capitalize" }}>{s}</button>
        ))}
      </div>
    </div>
  );
};

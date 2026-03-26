import React from 'react';
import { T } from '../../../theme/tokens';
import { venues } from '../../../data/mockData';
import { MobNav } from '../MobNav';
import { VenueCard } from '../UserComponents';

export const RainbowScreen = ({ navigate, setSelectedVenue }) => {
    const lgbtqVenues = venues.filter(v => v.badges.includes("Rainbow") || v.genre.includes("Rainbow"));
    return (
        <div className="screen-enter" style={{ height: "100%", position: "relative", background: `radial-gradient(circle at 50% 10%, rgba(124,77,255,0.05) 0%, ${T.bg} 40%)` }}>
            <div style={{ padding: "56px 20px 24px", background: `linear-gradient(to bottom, ${T.bg} 80%, transparent)`, zIndex: 10, position: "sticky", top: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 13, fontWeight: 700, color: T.purple }}>
                    🌈 Rainbow Choice
                </div>
                <div style={{ fontFamily: T.font2, fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>Safe & Inclusive Spaces</div>
                <div style={{ fontSize: 13, color: T.t2, marginTop: 4 }}>Venues committed to being LGBTQ+ friendly and safe for all.</div>
            </div>

            <div className="mscroll" style={{ padding: "0 20px", paddingBottom: 100 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {lgbtqVenues.map(v => (
                        <div key={v.id} style={{ position: "relative" }}>
                            <div style={{ position: "absolute", top: 14, right: 14, zIndex: 10, padding: "4px 10px", borderRadius: 12, background: "rgba(0,0,0,0.6)", border: `1px solid ${T.purple}`, color: T.purple, fontSize: 10, fontWeight: 700 }}>VERIFIED SAFE</div>
                            <VenueCard venue={v}
                                onDetail={() => { setSelectedVenue(v); navigate("venue"); }}
                                onBook={() => { setSelectedVenue(v); navigate("booking"); }}
                            />
                        </div>
                    ))}
                    {lgbtqVenues.length === 0 && (
                        <div style={{ padding: 40, textAlign: "center", color: T.t3 }}>No rainbow-verified venues found in this area yet.</div>
                    )}

                    <div className="glass-card" style={{ borderRadius: 20, padding: 22, marginTop: 20, borderTop: `4px solid ${T.purple}`, background: `linear-gradient(135deg, rgba(124,77,255,0.05), transparent)` }}>
                        <div style={{ fontSize: 20, marginBottom: 12 }}>🛡️</div>
                        <div style={{ fontFamily: T.font2, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Our Inclusivity Commitment</div>
                        <div style={{ fontSize: 12, color: T.t2, lineHeight: 1.6 }}>We manually verify venues that carry the Rainbow badge. If you ever feel unsafe at any of our partner venues, please use the SOS button immediately.</div>
                    </div>
                </div>
            </div>
            <MobNav active="search" navigate={navigate} />
        </div>
    );
};

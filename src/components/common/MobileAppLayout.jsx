import React, { useState } from 'react';
import { T } from '../../theme/tokens';

export const MobileAppHeader = ({ title, showBack, onBack, navSections, onSelect, activePanel }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mobile-only app-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10000, height: 74, display: 'flex', alignItems: 'center', padding: '0 20px', background: 'rgba(10,10,14,0.95)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
      {showBack && (
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: T.white, marginRight: 16, fontSize: 20 }}>
          ←
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.font2, fontSize: 18, fontWeight: 700, color: T.white }}>{title}</div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 20 }}>🔔</span>
        {navSections && (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: 'none', color: T.white, fontSize: 24, padding: '4px 8px', cursor: 'pointer' }}
          >
            ⋮
          </button>
        )}
      </div>

      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10001 }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', top: 60, right: 20, width: 220, background: 'rgba(20,20,25,0.98)', border: `1px solid ${T.border}`, borderRadius: 16, padding: '12px 0', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', backdropFilter: 'blur(30px)', animation: 'fade-in 0.2s ease-out' }}
          >
            {navSections.map(({ section, items }) => (
              <div key={section}>
                <div style={{ padding: '12px 20px 6px', fontSize: 10, fontWeight: 800, color: T.t4, textTransform: 'uppercase', letterSpacing: '1px' }}>{section}</div>
                {items.map(([id, icon, label, badge]) => (
                  <div 
                    key={id} 
                    onClick={() => { onSelect(id); setMenuOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', cursor: 'pointer', background: activePanel === id ? 'rgba(255,255,255,0.05)' : 'transparent', color: activePanel === id ? T.purple2 || T.green : T.white }}
                  >
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <span style={{ fontSize: 14, fontWeight: activePanel === id ? 700 : 500, flex: 1 }}>{label}</span>
                    {badge && <span style={{ background: T.red, color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 8 }}>{badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const BottomNav = ({ items, active, onSelect }) => (
  <div className="mobile-only bottom-nav">
    {items.map(([id, icon, label]) => (
      <div 
        key={id} 
        onClick={() => onSelect(id)} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 4, 
          color: active === id ? T.green : T.t3,
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <span style={{ fontSize: 22, filter: active === id ? `drop-shadow(0 0 8px ${T.green}44)` : 'none' }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: active === id ? 700 : 500 }}>{label}</span>
      </div>
    ))}
  </div>
);

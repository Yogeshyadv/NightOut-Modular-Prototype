// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Venues  — list, add, edit, delete
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, VenueCard, EmptyState, StatusPill, PageHeader,
  Button, Input, Textarea, Select, TagSelect, Modal, ConfirmModal, Icon,
} from '../../components/ui/index.js';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { VENUES as SEED } from '../../data/mockData.js';
import { fmt, cn }      from '../../utils/helpers.js';

const GENRE_OPTIONS    = ['EDM','Commercial','Bollywood','Hip-Hop','House','Techno','Live Band','Retro','Sufi'];
const AMENITY_OPTIONS  = ['Parking','Valet','Dance Floor','Rooftop','VIP Lounge','Hookah','Kitchen','Smoking Area','Gender-Neutral WC'];
const CITY_OPTIONS     = ['Jaipur','Delhi','Mumbai','Bengaluru','Chennai','Hyderabad','Pune','Kolkata'];
const CATEGORY_OPTIONS = ['Nightclub','Bar','Lounge','Rooftop Bar','Premium Club','Event Venue'];

const BLANK = {
  name:'', city:'Jaipur', location:'', category:'Nightclub', capacity:'',
  stagPrice:'', couplePrice:'', femalePrice:'', openTime:'', dresscode:'', includes:'',
  genre:[], amenities:[],
};

function VenueForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ ...BLANK, ...initial });
  const [errors, setErrors] = useState({});

  const set  = k => e  => setForm(f => ({ ...f, [k]: e.target.value }));
  const setV = (k, v)  => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name      = 'Venue name is required';
    if (!form.location.trim())e.location  = 'Location is required';
    if (!form.stagPrice)      e.stagPrice = 'Stag price is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = () => { if (validate()) onSave(form); };

  return (
    <div className="space-y-6">
      {/* Basic info */}
      <section>
        <div className="label-xs text-dark-100 mb-3">Basic Information</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Venue Name *" placeholder="F Bar & Lounge" value={form.name}     onChange={set('name')}     error={errors.name}     />
          <Input label="Location *"   placeholder="MI Road, Jaipur" value={form.location} onChange={set('location')} error={errors.location} />
          <Select label="Category"   options={CATEGORY_OPTIONS} value={form.category} onChange={set('category')} />
          <Select label="City"        options={CITY_OPTIONS}     value={form.city}     onChange={set('city')}     />
          <Input label="Capacity"  type="number" placeholder="350" value={form.capacity} onChange={set('capacity')} />
          <Input label="Open Hours" placeholder="8:00 PM – 1:00 AM" value={form.openTime} onChange={set('openTime')} />
        </div>
      </section>

      {/* Pricing */}
      <section>
        <div className="label-xs text-dark-100 mb-3">Entry Pricing (₹)</div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Stag *"   type="number" placeholder="1500" value={form.stagPrice}   onChange={set('stagPrice')}   error={errors.stagPrice} />
          <Input label="Couple"   type="number" placeholder="2000" value={form.couplePrice} onChange={set('couplePrice')} />
          <Input label="Female"   type="number" placeholder="800"  value={form.femalePrice} onChange={set('femalePrice')} />
        </div>
        <Input className="mt-4" label="Entry Includes" placeholder="2 complimentary drinks per person" value={form.includes} onChange={set('includes')} />
      </section>

      {/* Rules */}
      <Textarea label="Dress Code" placeholder="Smart casual. No shorts or flip-flops." value={form.dresscode} onChange={set('dresscode')} rows={2} />

      {/* Genre & amenities */}
      <TagSelect label="Music Genres"       options={GENRE_OPTIONS}   selected={form.genre}     onChange={v => setV('genre', v)}     />
      <TagSelect label="Amenities"          options={AMENITY_OPTIONS} selected={form.amenities} onChange={v => setV('amenities', v)} accent="purple" />

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost-dark" size="md" onClick={onClose}>Cancel</Button>
        <Button size="md" onClick={handleSave}>
          {initial?.id ? 'Save Changes' : 'Create Venue'}
        </Button>
      </div>
    </div>
  );
}

export default function Venues() {
  const { toasts, show, dismiss } = useToast();
  const [venues, setVenues] = useState(SEED.filter(v => v.vendorId === 'V001'));
  const [editTarget,   setEditTarget]   = useState(null);   // venue obj or null
  const [addOpen,      setAddOpen]      = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [view,         setView]         = useState('grid'); // 'grid' | 'list'

  const saveVenue = (form) => {
    if (editTarget) {
      setVenues(vs => vs.map(v => v.id === editTarget.id ? { ...v, ...form } : v));
      show('Venue updated successfully!');
      setEditTarget(null);
    } else {
      const newV = {
        ...form, id: `VN00${Date.now()}`, vendorId:'V001', status:'Active',
        rating:0, reviews:0, bookings:0, monthlyRevenue:0,
        emoji:'🎆', gradientFrom:'#0d001a', gradientTo:'#1e0035',
        created: new Date().toISOString(),
      };
      setVenues(vs => [...vs, newV]);
      show('Venue created and listed on NightOut!');
      setAddOpen(false);
    }
  };

  const confirmDelete = () => {
    setVenues(vs => vs.filter(v => v.id !== deleteTarget.id));
    show('Venue removed.', 'warning');
    setDeleteTarget(null);
  };

  const totalRev      = venues.reduce((s, v) => s + v.monthlyRevenue, 0);
  const totalBookings = venues.reduce((s, v) => s + v.bookings, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader
        title="Manage Venues"
        subtitle={`${venues.length} venue${venues.length !== 1 ? 's' : ''} in your portfolio`}
        action={
          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-xl p-1">
              {[['grid','⊞'],['list','☰']].map(([v, icon]) => (
                <button key={v} onClick={() => setView(v)}
                  className={cn('px-3 py-1.5 rounded-lg text-sm transition-all', view === v ? 'bg-green text-black font-bold' : 'dark:text-dark-100 text-dark-400')}>
                  {icon}
                </button>
              ))}
            </div>
            <Button size="md" leftIcon="plus" onClick={() => setAddOpen(true)}>Add Venue</Button>
          </div>
        }
      />

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="building" label="Total Venues"   value={venues.length}                        accent="green"  />
        <StatCard icon="✅"        label="Active"          value={venues.filter(v=>v.status==='Active').length} accent="green"  />
        <StatCard icon="calendar" label="Total Bookings" value={fmt.number(totalBookings)}             accent="purple" />
        <StatCard icon="💰"       label="Monthly Revenue" value={fmt.shortCurrency(totalRev)}           accent="gold"   />
      </div>

      {/* Empty state */}
      {venues.length === 0 ? (
        <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-3xl p-12">
          <EmptyState icon="🏢" title="No venues yet" subtitle="Add your first venue to start accepting bookings."
            action={<Button size="md" leftIcon="plus" onClick={() => setAddOpen(true)} className="mt-4">Add Your First Venue</Button>} />
        </div>
      ) : view === 'grid' ? (
        /* Grid view */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {venues.map(v => (
            <VenueCard key={v.id} venue={v}
              onEdit={() => setEditTarget(v)}
              onDelete={() => setDeleteTarget(v)} />
          ))}
        </div>
      ) : (
        /* List / table view */
        <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl overflow-hidden">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b dark:border-dark-400 border-light-200">
                {['Venue','Category','City','Pricing','Bookings','Revenue','Status',''].map(h => (
                  <th key={h} className="text-left label-xs text-dark-100 px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {venues.map(v => (
                <tr key={v.id} className="border-b dark:border-dark-400/50 border-light-200/70 last:border-0 hover:dark:bg-dark-500/40 hover:bg-light-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background:`linear-gradient(135deg,${v.gradientFrom},${v.gradientTo})` }}>
                        {v.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{v.name}</div>
                        <div className="text-[11px] dark:text-dark-100 text-dark-400">{v.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm dark:text-dark-100 text-dark-400">{v.category}</td>
                  <td className="px-5 py-4 text-sm dark:text-dark-100 text-dark-400">{v.city}</td>
                  <td className="px-5 py-4"><div className="text-sm font-bold text-green">{fmt.currency(v.stagPrice)}</div><div className="text-[10px] dark:text-dark-100 text-dark-400">stag</div></td>
                  <td className="px-5 py-4 text-sm font-semibold">{fmt.number(v.bookings)}</td>
                  <td className="px-5 py-4 text-sm font-bold text-green">{fmt.shortCurrency(v.monthlyRevenue)}</td>
                  <td className="px-5 py-4"><StatusPill status={v.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Button size="xs" variant="ghost-dark" leftIcon="edit" onClick={() => setEditTarget(v)}>Edit</Button>
                      <Button size="xs" variant="danger"     leftIcon="trash" onClick={() => setDeleteTarget(v)}>Del</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit modal */}
      <Modal
        open={addOpen || !!editTarget}
        onClose={() => { setAddOpen(false); setEditTarget(null); }}
        title={editTarget ? `Edit: ${editTarget.name}` : 'Add New Venue'}
        subtitle="Configure venue details and pricing"
        size="lg">
        <VenueForm initial={editTarget ?? {}} onSave={saveVenue} onClose={() => { setAddOpen(false); setEditTarget(null); }} />
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Venue"
        message={`Delete "${deleteTarget?.name}"? All bookings and data will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete Venue"
        danger
      />
    </div>
  );
}

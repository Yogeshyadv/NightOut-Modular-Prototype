import { useState, useEffect } from 'react';
import { PageHeader, Card, Button, Input, Textarea, Icon, StatusPill, EmptyState, Divider } from '../../components/ui/index.js';
import { useVerification } from '../../hooks/useVerification.js';
import { useNotifications } from '../../hooks/useNotifications.js';

import { useAuth } from '../../context/AuthContext.jsx';
import { cn } from '../../utils/helpers.js';


const PLANS = [
  { 
    id: 'starter', 
    name: 'Starter', 
    price: 'Free', 
    desc: 'Perfect for small lounges',
    features: ['1 Venue Listing', '5% Commission', 'Standard Support'],
    accent: 'text-dark-100',
    bg: 'dark:bg-dark-700 bg-light-50'
  },
  { 
    id: 'pro', 
    name: 'Pro', 
    price: '₹4,999/mo', 
    desc: 'Best for busy clubs',
    features: ['5 Venue Listings', '2% Commission', 'Priority Support', 'Advanced Analytics'],
    accent: 'text-green',
    bg: 'bg-green/10 border-green/30'
  },
  { 
    id: 'elite', 
    name: 'Elite', 
    price: '₹9,999/mo', 
    desc: 'For hospitality groups',
    features: ['Unlimited Venues', '1% Commission', 'Account Manager', 'Featured Placement'],
    accent: 'text-purple-light',
    bg: 'bg-purple/10 border-purple/30'
  }
];

export default function VendorVerification() {
  const { user, refreshUser } = useAuth();
  const { status, loading, apply } = useVerification();
  const { markTypeRead } = useNotifications();
  const [step, setStep] = useState(1);

  useEffect(() => {
    refreshUser();
    markTypeRead('verification_approved');
    markTypeRead('verification_rejected');
  }, []);

  const [form, setForm] = useState({
    businessName: '',
    businessId: '',
    businessAddress: '',
    contactNumber: '',
    logo: '',
    slogan: '',
    website: '',
    operatingHours: '',
    selectedPlan: 'pro',
    socialLinks: { instagram: '', facebook: '', twitter: '' }
  });

  const handleSubmit = async () => {
    await apply(form);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({...form, logo: reader.result});
      reader.readAsDataURL(file);
    }
  };

  if (user?.isVerified) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-20 animate-fade-up">
        <div className="w-20 h-20 bg-green/20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
          <Icon name="check" size={40} className="text-green" />
        </div>
        <h2 className="heading-sm mb-2 text-3xl">You're All Set!</h2>
        <p className="text-dark-100 mb-8 max-w-md mx-auto">Your business identity has been verified. You now have full access to the NightOut marketplace.</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => window.location.href = '/vendor/dashboard'}>Go to Dashboard</Button>
          <Button variant="ghost-dark" onClick={() => window.location.href = '/vendor/venues'}>Add Your First Venue</Button>
        </div>
      </div>
    );
  }

  if (status && status.status === 'pending') {
    return (
      <div className="p-6 max-w-2xl mx-auto animate-fade-up">
        <PageHeader title="Verification Status" subtitle="We're reviewing your application" />
        <Card className="p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <StatusPill status="Pending" />
          </div>
          <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl animate-pulse">⏳</div>
          <h3 className="font-bold text-2xl mb-3">Identity Review in Progress</h3>
          <p className="text-sm text-dark-100 mb-8 max-w-sm mx-auto leading-relaxed">
            Our compliance team is verifying your business ID and licenses. You'll receive a notification once your account is active.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-2xl dark:bg-dark-700 bg-light-50 border dark:border-dark-600">
              <div className="text-[10px] uppercase tracking-wider text-dark-400 font-bold mb-1">Business</div>
              <div className="text-sm font-bold truncate">{status.businessName}</div>
            </div>
            <div className="p-4 rounded-2xl dark:bg-dark-700 bg-light-50 border dark:border-dark-600">
              <div className="text-[10px] uppercase tracking-wider text-dark-400 font-bold mb-1">Selected Plan</div>
              <div className="text-sm font-bold text-purple-light capitalize">{status.selectedPlan}</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 animate-fade-up">
      <div className="flex items-end justify-between border-b dark:border-dark-600 border-light-200 pb-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight">Onboarding</h1>
          <p className="text-dark-100 mt-2">Step {step} of 3: {step === 1 ? 'Business Identity' : step === 2 ? 'Branding & Socials' : 'Select Your Plan'}</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn('h-1.5 w-12 rounded-full transition-all duration-500', i <= step ? 'bg-green shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'dark:bg-dark-600 bg-light-200')} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {step === 1 && (
            <Card className="p-8 animate-fade-in" title="Business Identity">
              <div className="space-y-6">
                <Input 
                  label="Legal Business Name *" 
                  placeholder="e.g. Skyline Hospitality Group"
                  value={form.businessName}
                  onChange={(e) => setForm({...form, businessName: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="GST / License ID *" 
                    placeholder="Official ID number"
                    value={form.businessId}
                    onChange={(e) => setForm({...form, businessId: e.target.value})}
                  />
                  <Input 
                    label="Contact Number *" 
                    placeholder="+91 XXXXX XXXXX"
                    value={form.contactNumber}
                    onChange={(e) => setForm({...form, contactNumber: e.target.value})}
                  />
                </div>
                <Textarea 
                  label="Registered Address *" 
                  placeholder="Full physical address"
                  value={form.businessAddress}
                  onChange={(e) => setForm({...form, businessAddress: e.target.value})}
                  rows={3}
                />
                <Button size="lg" className="w-full" onClick={() => setStep(2)}>Continue to Branding</Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8 animate-fade-in" title="Branding & Media">
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 rounded-2xl dark:bg-dark-700 bg-light-50 border dark:border-dark-600">
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed dark:border-dark-500 border-light-200 flex items-center justify-center overflow-hidden bg-white/5 relative group cursor-pointer">
                    {form.logo ? (
                      <img src={form.logo} className="w-full h-full object-cover" alt="Logo" />
                    ) : (
                      <Icon name="image" size={24} className="text-dark-400" />
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLogoUpload} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">Business Logo</div>
                    <p className="text-xs text-dark-100 mt-1">Upload a high-res logo (PNG/JPG). Recommended size 512x512px.</p>
                  </div>
                </div>

                <Input 
                  label="Brand Slogan" 
                  placeholder="e.g. Elevating Nightlife Experiences"
                  value={form.slogan}
                  onChange={(e) => setForm({...form, slogan: e.target.value})}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Website URL" 
                    placeholder="https://yourbrand.com"
                    value={form.website}
                    onChange={(e) => setForm({...form, website: e.target.value})}
                  />
                  <Input 
                    label="Operating Hours" 
                    placeholder="e.g. 7 PM - 3 AM"
                    value={form.operatingHours}
                    onChange={(e) => setForm({...form, operatingHours: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <div className="label-xs text-dark-100">Social Presence</div>
                  <div className="grid grid-cols-3 gap-3">
                    <Input placeholder="Instagram" value={form.socialLinks.instagram} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, instagram: e.target.value}})} />
                    <Input placeholder="Facebook" value={form.socialLinks.facebook} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, facebook: e.target.value}})} />
                    <Input placeholder="Twitter" value={form.socialLinks.twitter} onChange={e => setForm({...form, socialLinks: {...form.socialLinks, twitter: e.target.value}})} />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="ghost-dark" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-[2]" onClick={() => setStep(3)}>Continue to Pricing</Button>
                </div>
              </div>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setForm({...form, selectedPlan: p.id})}
                    className={cn(
                      'p-6 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden group',
                      form.selectedPlan === p.id 
                        ? 'dark:bg-dark-700 bg-white border-green shadow-[0_10px_30px_rgba(34,197,94,0.15)] scale-105 z-10' 
                        : 'dark:bg-dark-800 bg-white dark:border-dark-600 border-light-200 hover:border-dark-400 opacity-80'
                    )}
                  >
                    {form.selectedPlan === p.id && <div className="absolute top-3 right-3 text-green"><Icon name="check" size={18} /></div>}
                    <div className={cn('text-xs font-black uppercase tracking-widest mb-1', p.accent)}>{p.name}</div>
                    <div className="text-2xl font-black mb-2">{p.price}</div>
                    <p className="text-[10px] text-dark-100 mb-4 h-8">{p.desc}</p>
                    <div className="space-y-2">
                      {p.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-[10px] font-medium">
                          <Icon name="check" size={10} className="text-green" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green/10 rounded-xl flex items-center justify-center text-green">
                      <Icon name="shield" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Ready for Review?</div>
                      <p className="text-xs text-dark-400">All information will be securely sent to our compliance team.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost-dark" onClick={() => setStep(2)}>Go Back</Button>
                    <Button loading={loading} onClick={handleSubmit}>Submit Application</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card title="Quick Checklist">
            <div className="space-y-4">
              {[
                { done: step > 1, text: 'Identity Details' },
                { done: step > 2, text: 'Logo & Branding' },
                { done: step === 3 && form.selectedPlan, text: 'Subscription Plan' },
                { done: false, text: 'Admin Review' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn('w-5 h-5 rounded-full flex items-center justify-center', item.done ? 'bg-green text-white' : 'dark:bg-dark-700 bg-light-100 border dark:border-dark-600')}>
                    {item.done ? <Icon name="check" size={10} /> : <span className="text-[10px]">{i+1}</span>}
                  </div>
                  <span className={cn('text-xs font-medium', item.done ? 'text-white' : 'text-dark-100')}>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple to-purple-dark text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="text-lg font-black mb-1">Need help?</div>
              <p className="text-xs text-white/70 mb-4 leading-relaxed">Our vendor onboarding team is available 24/7 to help you set up your account.</p>
              <button className="text-[10px] font-black uppercase tracking-widest bg-white text-purple px-4 py-2 rounded-xl hover:scale-105 transition-all">Chat with Support</button>
            </div>
            <Icon name="zap" size={120} className="absolute -right-8 -bottom-8 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

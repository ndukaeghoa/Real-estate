import { useEffect, useState } from 'react';
import { ListingCard } from '../components/ListingCard';
import { api } from '../services/api';

export const TenantDashboard = () => {
  const [listings, setListings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  const load = async () => {
    const [l, a, p, m] = await Promise.all([
      api.get('/listings/public', { params: { limit: 12 } }),
      api.get('/applications'),
      api.get('/payments'),
      api.get('/maintenance')
    ]);
    setListings(l.data.items);
    setApplications(a.data);
    setPayments(p.data);
    setMaintenance(m.data);
  };

  useEffect(() => { load(); }, []);

  const apply = async (listingId) => {
    await api.post('/applications', { listingId, message: 'I am interested in renting this apartment.', documents: ['paystub.pdf', 'id.jpg'] });
    load();
  };

  const payRent = async (listingId, amount) => {
    await api.post('/payments', { listingId, amount });
    load();
  };

  const requestMaintenance = async (listingId) => {
    await api.post('/maintenance', { listingId, issue: 'Air conditioner not cooling', priority: 'high' });
    load();
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-semibold text-lg mb-3">Available Apartments</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              action={
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => apply(listing._id)} className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">Apply</button>
                  <button onClick={() => payRent(listing._id, listing.rent)} className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">Pay Rent</button>
                  <button onClick={() => requestMaintenance(listing._id)} className="text-xs bg-amber-600 text-white px-2 py-1 rounded">Maintenance</button>
                </div>
              }
            />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Panel title="My Applications" rows={applications.map((x) => `${x.listing?.title}: ${x.status}`)} />
        <Panel title="My Payments" rows={payments.map((x) => `${x.reference}: ${x.status}`)} />
        <Panel title="Maintenance Requests" rows={maintenance.map((x) => `${x.listing?.title}: ${x.status}`)} />
      </section>
    </div>
  );
};

const Panel = ({ title, rows }) => (
  <div className="bg-white border rounded-lg p-4">
    <h3 className="font-medium mb-2">{title}</h3>
    <ul className="text-sm space-y-2">{rows.map((r, i) => <li key={i} className="border-b pb-1">{r}</li>)}</ul>
  </div>
);

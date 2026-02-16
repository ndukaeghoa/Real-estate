import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ListingCard } from '../components/ListingCard';

export const LandlordDashboard = () => {
  const [listings, setListings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [newListing, setNewListing] = useState({ title: '', description: '', address: '', location: '', rent: 1000, bedrooms: 1, amenities: '', photos: '' });

  const load = async () => {
    const [l, a, p, m] = await Promise.all([
      api.get('/listings'),
      api.get('/applications'),
      api.get('/payments'),
      api.get('/maintenance')
    ]);
    setListings(l.data);
    setApplications(a.data);
    setPayments(p.data);
    setMaintenance(m.data);
  };

  useEffect(() => { load(); }, []);

  const createListing = async (e) => {
    e.preventDefault();
    await api.post('/listings', {
      ...newListing,
      amenities: newListing.amenities.split(',').map((s) => s.trim()).filter(Boolean),
      photos: newListing.photos.split(',').map((s) => s.trim()).filter(Boolean)
    });
    setNewListing({ title: '', description: '', address: '', location: '', rent: 1000, bedrooms: 1, amenities: '', photos: '' });
    load();
  };

  return (
    <div className="space-y-8">
      <section className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-3">Add Apartment Listing</h2>
        <form onSubmit={createListing} className="grid md:grid-cols-2 gap-2">
          {['title', 'description', 'address', 'location', 'rent', 'bedrooms', 'amenities', 'photos'].map((field) => (
            <input key={field} className="border rounded px-3 py-2" placeholder={field} value={newListing[field]} onChange={(e) => setNewListing((p) => ({ ...p, [field]: e.target.value }))} />
          ))}
          <button className="bg-indigo-600 text-white rounded px-3 py-2">Create</button>
        </form>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-3">My Listings</h2>
        <div className="grid md:grid-cols-3 gap-4">{listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}</div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <DashboardTable title="Applications" rows={applications.map((a) => `${a.listing?.title}: ${a.status}`)} />
        <DashboardTable title="Payments" rows={payments.map((p) => `${p.reference}: ${p.status} ($${p.amount})`)} />
        <DashboardTable title="Maintenance" rows={maintenance.map((m) => `${m.listing?.title}: ${m.status}`)} />
      </section>
    </div>
  );
};

const DashboardTable = ({ title, rows }) => (
  <div className="bg-white border rounded-lg p-4">
    <h3 className="font-medium mb-2">{title}</h3>
    <ul className="text-sm space-y-2">{rows.map((r, i) => <li key={i} className="border-b pb-1">{r}</li>)}</ul>
  </div>
);

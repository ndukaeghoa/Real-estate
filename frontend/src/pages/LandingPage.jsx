import { useEffect, useState } from 'react';
import { ListingCard } from '../components/ListingCard';
import { api } from '../services/api';

export const LandingPage = () => {
  const [filters, setFilters] = useState({ q: '', location: '', bedrooms: '', minRent: '', maxRent: '', amenities: '' });
  const [listings, setListings] = useState([]);

  const loadListings = async () => {
    const { data } = await api.get('/listings/public', { params: { ...filters, sort: '-createdAt', limit: 9 } });
    setListings(data.items);
  };

  useEffect(() => { loadListings(); }, []);

  return (
    <section className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-bold">Find your next apartment on Efortlex</h1>
        <p className="opacity-90 mt-2">Explore verified listings from trusted landlords.</p>
      </div>

      <div className="bg-white rounded-lg border p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="border rounded px-3 py-2"
            value={filters[key]}
            onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
          />
        ))}
        <button onClick={loadListings} className="bg-indigo-600 text-white rounded px-3 py-2">Search & Filter</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)}
      </div>
    </section>
  );
};

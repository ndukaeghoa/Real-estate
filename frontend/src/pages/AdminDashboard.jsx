import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const load = async () => {
    const [u, l, a] = await Promise.all([
      api.get('/admin/users'),
      api.get('/listings'),
      api.get('/admin/analytics')
    ]);
    setUsers(u.data);
    setListings(l.data);
    setAnalytics(a.data);
  };

  useEffect(() => { load(); }, []);

  const updateRole = async (id, role) => {
    await api.patch(`/admin/users/${id}/role`, { role });
    load();
  };

  const approveListing = async (id, status) => {
    await api.patch(`/listings/${id}/approve`, { status });
    load();
  };

  return (
    <div className="space-y-8">
      <section className="grid md:grid-cols-4 gap-4">
        {analytics && Object.entries(analytics).map(([k, v]) => (
          <div key={k} className="bg-white border rounded-lg p-4">
            <p className="text-xs uppercase text-slate-500">{k}</p>
            <p className="font-semibold text-xl">{v}</p>
          </div>
        ))}
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-2">User Management</h2>
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center border rounded p-2">
              <span>{u.name} ({u.email})</span>
              <select value={u.role} onChange={(e) => updateRole(u._id, e.target.value)} className="border rounded px-2 py-1">
                <option value="tenant">tenant</option>
                <option value="landlord">landlord</option>
                <option value="admin">admin</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold mb-2">Listing Moderation</h2>
        <div className="space-y-2">
          {listings.map((l) => (
            <div key={l._id} className="flex justify-between items-center border rounded p-2">
              <span>{l.title} - {l.status}</span>
              <div className="flex gap-2">
                <button onClick={() => approveListing(l._id, 'approved')} className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">Approve</button>
                <button onClick={() => approveListing(l._id, 'rejected')} className="text-xs bg-red-600 text-white px-2 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'tenant' });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign up.');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white border rounded-lg p-6 space-y-3">
      <h2 className="text-xl font-semibold">Create account</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {['name', 'email', 'password'].map((field) => (
        <input
          key={field}
          type={field === 'password' ? 'password' : 'text'}
          className="border rounded px-3 py-2 w-full"
          placeholder={field}
          value={form[field]}
          onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
        />
      ))}
      <select className="border rounded px-3 py-2 w-full" value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Sign up</button>
    </form>
  );
};

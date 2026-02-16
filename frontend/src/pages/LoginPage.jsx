import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Please try again.');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white border rounded-lg p-6 space-y-3">
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input className="border rounded px-3 py-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="border rounded px-3 py-2 w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  );
};

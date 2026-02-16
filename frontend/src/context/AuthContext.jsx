import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setJwt] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(token);
  }, [token]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setJwt(data.token);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const signup = async (payload) => {
    const { data } = await api.post('/auth/signup', payload);
    setJwt(data.token);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    setJwt(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = useMemo(() => ({ user, token, login, signup, logout, setUser }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

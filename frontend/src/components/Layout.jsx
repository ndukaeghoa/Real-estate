import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">Efortlex</Link>
          <div className="flex gap-3 items-center">
            {!user ? (
              <>
                <Link to="/login" className="text-sm">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-3 py-1 rounded">Sign up</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-sm">Dashboard</Link>
                <button onClick={logout} className="text-sm text-red-600">Logout</button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </div>
  );
};

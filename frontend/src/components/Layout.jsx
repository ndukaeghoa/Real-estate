import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const dashboardItems = [
  { label: 'Tenant Dashboard', path: '/dashboard/tenant' },
  { label: 'Landlord Dashboard', path: '/dashboard/landlord' },
  { label: 'Admin Dashboard', path: '/dashboard/admin' }
];

const DashboardDropdown = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 hover:text-indigo-600"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Dashboards
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-lg border bg-white shadow-lg z-20 py-1">
          {dashboardItems.map((item) => (
            <button
              key={item.path}
              type="button"
              className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100"
              onClick={() => {
                onNavigate(item.path);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <div>
      <header className="bg-white border-b sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="text-xl font-bold text-indigo-600">Efortlex</Link>

            <button
              type="button"
              className="md:hidden border rounded px-3 py-1 text-sm"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              ☰
            </button>

            <div className="hidden md:flex flex-wrap gap-4 items-center text-sm">
              <Link to="/" className="hover:text-indigo-600">Home</Link>
              <Link to="/about" className="hover:text-indigo-600">About</Link>
              <Link to="/services" className="hover:text-indigo-600">Services</Link>
              <Link to="/contact" className="hover:text-indigo-600">Contact</Link>

              <DashboardDropdown onNavigate={goTo} />

              {!user ? (
                <>
                  <Link to="/login" className="hover:text-indigo-600">Login</Link>
                  <Link to="/signup" className="bg-indigo-600 text-white px-3 py-1 rounded">Sign up</Link>
                </>
              ) : (
                <>
                  <Link to={`/dashboard/${user.role}`} className="hover:text-indigo-600">My Dashboard</Link>
                  <button type="button" onClick={logout} className="text-red-600">Logout</button>
                </>
              )}
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden mt-3 border-t pt-3 grid gap-2 text-sm">
              <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-indigo-600">Home</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="hover:text-indigo-600">About</Link>
              <Link to="/services" onClick={() => setMobileOpen(false)} className="hover:text-indigo-600">Services</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="hover:text-indigo-600">Contact</Link>

              <p className="text-xs text-slate-500 mt-1">Dashboards</p>
              <div className="grid gap-1">
                {dashboardItems.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    className="text-left border rounded px-2 py-1"
                    onClick={() => goTo(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="hover:text-indigo-600">Login</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="bg-indigo-600 text-white px-3 py-1 rounded inline-block w-fit">Sign up</Link>
                </>
              ) : (
                <>
                  <Link to={`/dashboard/${user.role}`} onClick={() => setMobileOpen(false)} className="hover:text-indigo-600">My Dashboard</Link>
                  <button type="button" onClick={logout} className="text-left text-red-600">Logout</button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </div>
  );
};

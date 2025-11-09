
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../redux/authSlice';
import { ROLES } from '../utils/permissions';
import LoadingRing from '../components/LoadingRing';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showApiLoader, setShowApiLoader] = useState(false);

  // Hardcoded credentials
  const credentialMap = {
    'admin@company.com': {
      password: 'admin123',
      role: ROLES.SUPER_ADMIN,
      name: 'Super Admin',
      id: 'admin-1',
    },
    'accountant@company.com': {
      password: 'acct123',
      role: ROLES.ACCOUNTANT,
      name: 'Accountant',
      id: 'acct-1',
    },
    'support@company.com': {
      password: 'support123',
      role: ROLES.SUPPORT,
      name: 'Support Staff',
      id: 'support-1',
    },
  };

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const entry = credentialMap[email?.trim().toLowerCase()];
    if (!entry || entry.password !== password) {
      setLoading(false);
      toast.error('Invalid credentials!');
      return;
    }

    // Show API loader to simulate API call
    setShowApiLoader(true);
    setLoading(false);
    
    // Simulate API call delay (2-3 seconds)
    setTimeout(() => {
      dispatch(
        login({
          id: entry.id,
          name: entry.name,
          role: entry.role,
          email: email.trim().toLowerCase(),
        })
      );
      
      toast.success(`Welcome, ${entry.name}!`);
      setShowApiLoader(false);
      navigate('/'); // navigate to dashboard
    }, 1500);
  }

  const blackShadow = 'rgba(0, 0, 0, 0.5)';

  return (
    <div className="min-h-screen flex relative" style={{ backgroundColor: '#9996eb' }}>
      {/* API Loader overlay - shows after successful credentials */}
      {showApiLoader && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
        >
          <LoadingRing loading={showApiLoader} color="#5B32B4" size={80} />
        </div>
      )}
      {/* Floating logo at top-left (above the admin card) */}
      <img
        src="/logo.svg"
        alt="nexmin logo"
        className="hidden lg:block absolute left-10 top-6 w-20 h-20 rounded-full bg-white p-1"
        style={{
          boxShadow: `0 18px 44px ${blackShadow}`,
          border: '3px solid rgba(255,255,255,0.95)',
          zIndex: 5,
        }}
      />

      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 overflow-hidden" style={{ zIndex: 1 }}>
        <div
          className="w-full max-w-3xl"
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: `0 25px 60px ${blackShadow}`,
            background: 'white',
          }}
        >
          <img
            src="/login-image.png"
            alt="nexmin delivery service"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center',
              display: 'block',
              width: '100%',
              height: '100%',
              maxHeight: 520,
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
            }}
          />
        </div>
      </div>

      {/* Right side - Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4" style={{ zIndex: 2 }}>
        <div
          className="max-w-md w-full bg-[#e6e6ff] rounded-lg p-8"
          style={{
            boxShadow: `0 18px 50px ${blackShadow}`,
            borderRadius: 12,
            position: 'relative',
          }}
        >
          <div className="flex items-center justify-center mb-6">
            <img src="/logo.svg" alt="nexmin logo" className="w-20 h-20" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>Admin Dashboard — Login</h1>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm md:text-base font-medium mb-2" style={{ color: '#2d3748' }}>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="block w-full border border-gray-300 rounded-lg text-base"
                style={{
                  padding: '0.875rem 1rem',
                  minHeight: '44px',
                  lineHeight: '1.5',
                }}
              />
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium mb-2" style={{ color: '#2d3748' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="block w-full border border-gray-300 rounded-lg text-base"
                style={{
                  padding: '0.875rem 1rem',
                  minHeight: '44px',
                  lineHeight: '1.5',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white rounded-lg font-medium disabled:opacity-60 transition-all duration-200 shadow-md hover:shadow-lg text-base md:text-lg"
              style={{
                background: loading 
                  ? 'linear-gradient(135deg, #7C4FCF 0%, #5B32B4 100%)' 
                  : 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
                boxShadow: `0 8px 20px ${blackShadow}`,
                padding: '0.875rem 1.5rem',
                minHeight: '44px',
                lineHeight: '1.5',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.background = 'linear-gradient(135deg, #4A2A95 0%, #5B32B4 100%)';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.background = 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)';
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-sm md:text-base" style={{ color: '#4a5568', lineHeight: '1.75' }}>
            <p className="font-medium mb-1">Test accounts:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Super Admin: admin@company.com / admin123</li>
              <li>Accountant: accountant@company.com / acct123</li>
              <li>Support Staff: support@company.com / support123</li>
            </ul>
          </div>

          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </div>
  );
}
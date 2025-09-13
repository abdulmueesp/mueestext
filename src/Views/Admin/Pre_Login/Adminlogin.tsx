
// @ts-nocheck
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRole } from '@/store/slices/userSlice';
import { message } from 'antd';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isUser = username === 'user' && password === '123';
    const isAdmin = username === 'admin' && password === '123';

    if (!isUser && !isAdmin) {
      setError('Invalid credentials');
      return;
    }

    setError('');
    const role = username === 'user' ? 'user' : 'admin';
    dispatch(setRole(role));
    message.success('Login successful!');
    // Let the App component handle the role-based routing
    navigate('/', { replace: true });
  };

  // No social login handlers in this simplified flow

  const lightPrimaryColor = '#f8f9fa';

  return (
    <div
      className="pb-4 pl-4 pr-4 pt-7"
      style={{
        backgroundColor: lightPrimaryColor,
        minHeight: '100dvh',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl ">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold mb-2 font-local2">
            Login
          </h1>
        </div>

        {/* Regular Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label
              className="block text-sm font-medium mb-2 font-local2"
              style={{ color: '#666666' }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-2 border border-gray-300 font-local2 rounded-md focus:outline-none "
              style={{ height: '44px' }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium mb-2 font-local2"
              style={{ color: '#666666' }}
            >
              Password
            </label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex-1 px-3 py-2 border border-gray-300 font-local2 rounded-l-md focus:outline-none "
                style={{ height: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 flex items-center justify-center"
                style={{ borderLeft: 'none', height: '44px' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                    <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.584 10.587A2 2 0 0112 10a2 2 0 012 2c0 .364-.097.704-.266.997M9.88 9.88A3 3 0 0012 9c1.657 0 3 1.343 3 3 0 .513-.129.997-.356 1.417m2.518 2.518C15.928 17.67 14.054 18.5 12 18.5 7 18.5 3.73 14.39 3 11.5c.219-.86.7-1.86 1.39-2.87m3.07-3.07C8.83 4.84 9.89 4.5 11 4.5c5 0 8.27 4.11 9 7-.26 1.02-.79 2.2-1.56 3.34" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs mt-1 font-local2">{error}</p>
          )}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className=" bg-gradient-to-br from-[#007575] to-[#339999] w-full h-11 rounded-md font-medium font-local2 text-white border-none shadow-md hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              // style={{ backgroundColor: '#007575' }}
            >
              Login
            </button>
          </div>

          {/* No social login for this simple flow */}
          
          <div className='w-[10px] py-[1px]'></div>
          
          <div className="mt-6">
            <hr className="flex-1 border-gray-300 mt-[25px]" />
            <div className="text-sm leading-relaxed px-2 font-local2 mt-4" style={{ color: '#666666' }}>
              You can use these account details to log in on both myWeb and Examin. Any changes to these details will impact both the Sites.
              <br />
              By continuing, you acknowledge that you are 18 years and above, and you accept our{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600 no-underline font-local2">
                Terms of service
              </a>
              ,{' '}
              <a href="#" className="text-blue-500 hover:text-blue-600 no-underline font-local2">
                Privacy policy
              </a>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
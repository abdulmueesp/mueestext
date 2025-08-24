// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setPhoneNumber } from '@/store/slices/userSlice';

// const LoginPage = ({ onLogin }: any) => {
//   const [phoneNumber, setPhoneNumberState] = useState('');
//   const [errors, setErrors] = useState<{ phoneNumber?: string }>({});
//   const dispatch = useDispatch();

//   const validatePhoneNumber = (phone: string) => {
//     if (!phone) {
//       return 'Please enter your phone number!';
//     }
//     if (!/^[0-9]{10}$/.test(phone)) {
//       return 'Please enter a valid 10-digit phone number!';
//     }
//     return '';
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const phoneError = validatePhoneNumber(phoneNumber);

//     if (phoneError) {
//       setErrors({ phoneNumber: phoneError });
//       return;
//     }

//     setErrors({});
    
//     dispatch(setPhoneNumber(phoneNumber));
//     console.log('Phone number:', phoneNumber);
//     if (onLogin) onLogin();
//   };

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setPhoneNumberState(value);

//     // Clear error when user starts typing
//     if (errors.phoneNumber) {
//       setErrors({ ...errors, phoneNumber: '' });
//     }
//   };

//   const handleGoogleLogin = () => {
//     console.log('Google login clicked');
//   };

//   const handleFacebookLogin = () => {
//     console.log('Facebook login clicked');
//   };

//   const handleEmailLogin = () => {
//     console.log('Email login clicked');
//   };

//   const lightPrimaryColor = '#f8f9fa'; // Very light background

//   return (
//     <div
//       className="pb-4 pl-4 pr-4 pt-7"
//       style={{
//         backgroundColor: lightPrimaryColor,
//     minHeight: '100dvh', // New dynamic viewport unit
//     boxSizing: 'border-box',
//     overflowX: 'hidden'
//       }}
//     >
//       <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl ">
//         {/* Header */}
//         <div className="text-center mb-4">
//           <h1
//             className="text-2xl font-semibold mb-2 font-local2"
//           >
//             Login
//           </h1>
//         </div>

//         {/* Regular Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Phone Number Input */}
//           <div>
//             <label
//               className="block text-sm font-medium mb-2 font-local2"
//               style={{
//                 color: '#666666',
//               }}
//             >
//               Phone Number:
//             </label>
//             <div className="flex">
//               <div
//                 className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 flex items-center"
//                 style={{ borderRight: 'none' }}
//               >
//                 <span className="text-gray-600 text-sm font-local2">+91</span>
//               </div>
//               <input
//                 type="tel"
//                 value={phoneNumber}
//                 onChange={handlePhoneChange}
//                 placeholder="Enter Phone Number"
//                 className={`flex-1 px-3 py-2 border border-gray-300 font-local2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.phoneNumber ? 'border-red-500' : ''
//                   }`}
//                 style={{
//                   height: '44px',
//                 }}
//               />
//             </div>
//             {errors.phoneNumber && (
//               <p className="text-red-500 text-xs mt-1 font-local2" >
//                 {errors.phoneNumber}
//               </p>
//             )}
//           </div>

//           {/* Login Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full h-11 rounded-md font-medium font-local2 text-white border-none shadow-md hover:shadow-lg transition-all duration-200 bg-blue-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               style={{
//                 backgroundColor: '#06014f',
//               }}
//             >
//               Login
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="flex items-center my-6">
//             <hr className="flex-1 border-gray-300" />
//             <span
//               className="px-4 font-semibold text-base font-local2 text-gray-600"
//             >
//               or continue with
//             </span>
//             <hr className="flex-1 border-gray-300" />
//           </div>

//           {/* Social Login Buttons */}
//           <div className="space-y-3">
//             {/* Google Login */}
//             <button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="w-full h-11 rounded-md font-medium font-local2 text-black bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             >
//               <div className="flex items-center">
//                 <div className="w-5 h-5 mr-3 flex items-center justify-center">
//                   <svg className="w-4 h-4" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                   </svg>
//                 </div>
//                 Sign in with Google
//               </div>
//             </button>

//             {/* Facebook Login */}
//             <button
//               type="button"
//               onClick={handleFacebookLogin}
//               className="w-full h-11 rounded-md font-medium font-local2 text-black bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             >
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//                 Sign in with Facebook
//               </div>
//             </button>

//             {/* Email Login */}
//             <button
//               type="button"
//               onClick={handleEmailLogin}
//               className="w-full h-11 rounded-md font-medium font-local2 text-black bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             >
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#06014f">
//                   <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//                 </svg>
//                 Sign in with Email
//               </div>
//             </button>
//           </div>
//            <div className='w-[10px] py-[1px]'></div>
//           {/* Add margin top to the HR and adjust footer spacing */}
//           <div className="mt-6">
//             <hr className="flex-1 border-gray-300 mt-[25px]" />
//             {/* Footer Text */}
//             <div
//               className="text-sm leading-relaxed px-2 font-local2 mt-4"
//               style={{
//                 color: '#666666',
//               }}
//             >
//               You can use these account details to log in on both myWeb and Examin. Any changes to these details will impact both the Sites.
//               <br />
//               By continuing, you acknowledge that you are 18 years and above, and you accept our{' '}
//               <a
//                 href="#"
//                 className="text-blue-500 hover:text-blue-600 no-underline font-local2"
//               >
//                 Terms of service
//               </a>
//               ,{' '}
//               <a
//                 href="#"
//                 className="text-blue-500 hover:text-blue-600 no-underline font-local2"
//               >
//                 Privacy policy
//               </a>
//               .
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPhoneNumber } from '@/store/slices/userSlice';

const LoginPage = ({ onLogin }: any) => {
  const [phoneNumber, setPhoneNumberState] = useState('');
  const [errors, setErrors] = useState<{ phoneNumber?: string }>({});
  const dispatch = useDispatch();

  const validatePhoneNumber = (phone: string) => {
    if (!phone) {
      return 'Please enter your phone number!';
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return 'Please enter a valid 10-digit phone number!';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhoneNumber(phoneNumber);

    if (phoneError) {
      setErrors({ phoneNumber: phoneError });
      return;
    }

    setErrors({});
    
    // ✅ Dispatch phone number to Redux (will be persisted)
    dispatch(setPhoneNumber(phoneNumber));
    console.log('Phone number stored in Redux:', phoneNumber);
    
    // ✅ Move to OTP screen
    if (onLogin) onLogin();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumberState(value);

    // Clear error when user starts typing
    if (errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: '' });
    }
  };

  // ... rest of your existing code remains the same
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  const handleEmailLogin = () => {
    console.log('Email login clicked');
  };

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
          {/* Phone Number Input */}
          <div>
            <label
              className="block text-sm font-medium mb-2 font-local2"
              style={{ color: '#666666' }}
            >
              Phone Number:
            </label>
            <div className="flex">
              <div
                className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 flex items-center"
                style={{ borderRight: 'none' }}
              >
                <span className="text-gray-600 text-sm font-local2">+91</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter Phone Number"
                className={`flex-1 px-3 py-2 border border-gray-300 font-local2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                style={{ height: '44px' }}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1 font-local2">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full h-11 rounded-md font-medium font-local2 text-white border-none shadow-md hover:shadow-lg transition-all duration-200 bg-blue-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              style={{ backgroundColor: '#06014f' }}
            >
              Login
            </button>
          </div>

          {/* Rest of your existing JSX... */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-4 font-semibold text-base font-local2 text-gray-600">
              or continue with
            </span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login Buttons - Your existing code */}
          <div className="space-y-3">
            <button type="button" onClick={handleGoogleLogin} className="w-full h-11 rounded-md font-medium font-local2 text-black bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                Sign in with Google
              </div>
            </button>
             {/* Facebook Login */}
          <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full h-11 rounded-md font-medium font-local2 text-black bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Sign in with Facebook
              </div>
            </button>

            {/* Email Login */}
            <button
              type="button"
              onClick={handleEmailLogin}
              className="w-full h-11 rounded-md font-medium font-local2 text-black bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="#06014f">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Sign in with Email
              </div>
            </button>
            {/* ... other social login buttons */}
          </div>
          
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

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setProfileCompleted, setRole } from '@/store/slices/userSlice'
import { message } from '@/Components/common/message/message';

const OtpForm = ({ onChangePhone }: { onChangePhone: () => void }) => {
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<{ otp?: string }>({});
    const [countdown, setCountdown] = useState(60);
    const dispatch = useDispatch();
    const { phoneNumber } = useSelector((state: RootState) => state.user);
    const lightPrimaryColor = '#f8f9fa';

    // Countdown timer effect
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const validateOtp = (otpValue: string) => {
        if (!otpValue) {
            return 'Please enter OTP!';
        }
        if (!/^[0-9]{6}$/.test(otpValue)) {
            return 'Please enter a valid 6-digit OTP!';
        }
        return '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const otpError = validateOtp(otp);

        if (otpError) {
            setErrors({ otp: otpError });
            return;
        }

        setErrors({});

        // ✅ CORRECTED OTP LOGIC - Check OTP and set role + authentication
        if (otp === '111111') {
            // 🔐 Admin Login Flow
            dispatch(setRole('admin')); // This sets isAuthenticated = true
            dispatch(setProfileCompleted(true)); // Admin profile is complete
            message.success('Admin login successful!');
        } else if (otp === '222222') {
            // 👤 User Login Flow  
            dispatch(setRole('user')); // This sets isAuthenticated = true
            dispatch(setProfileCompleted(false)); // User needs to complete profile
            message.success('User login successful! Please complete your profile.');
        } else {
            // ❌ Invalid OTP
            setErrors({ otp: 'Invalid OTP! Please try again.' });
            return;
        }

        console.log('✅ OTP verification successful');
        console.log('📱 Phone:', phoneNumber);
        console.log('🔐 OTP:', otp);
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        setOtp(value);

        // Clear error when user starts typing
        if (errors.otp) {
            setErrors({ ...errors, otp: '' });
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold mb-2 font-local2">
                        Verify OTP
                    </h1>
                  
                 
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                    {/* Phone Number Input (Read Only) */}
                    <div>
                        <label
                            className="block text-sm font-local2 mb-2"
                            style={{ color: '#666666' }}
                        >
                            Phone Number:
                        </label>
                        <div className="flex">
                            <div className="flex items-center justify-center px-3 font-local2 bg-gray-100 border border-gray-300 border-r-0 rounded-l-md text-gray-600 text-sm">
                                +91
                            </div>
                            <input
                                type="text"
                                value={phoneNumber}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 font-local2 rounded-r-md bg-gray-50 text-gray-600 focus:outline-none"
                                style={{ height: '44px' }}
                            />
                        </div>
                    </div>

                    {/* OTP Input */}
                    <div>
                        <label
                            className="block text-sm font-medium font-local2 mb-2"
                            style={{ color: '#666666' }}
                        >
                            OTP
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter 6-digit OTP"
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${errors.otp ? 'border-red-500' : ''}`}
                            style={{ height: '44px' }}
                            maxLength={6}
                        />
                        {errors.otp && (
                            <p className="text-red-500 text-xs mt-1 font-local2">
                                {errors.otp}
                            </p>
                        )}
                    </div>

                    {/* Verify Button */}
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-gradient-to-br from-[#007575] to-[#339999] w-full h-11 rounded-md font-local2 font-medium text-white border-none shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            // style={{ backgroundColor: '#007575' }}
                        >
                            Verify OTP
                        </button>
                    </div>

                    {/* Rest of your existing code... */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            Is phone number incorrect?{' '}
                            <button 
                            onClick={onChangePhone}
                            className="text-blue-500 hover:text-blue-600 font-local2 font-medium bg-none border-none cursor-pointer p-0 underline">
                                Change phone number
                            </button>
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatTime(countdown)}
                        </p>
                    </div>

                    <div className='w-[10px] py-[1px]'></div>
                    
                    <div className="mt-6">
                        <hr className="flex-1 border-gray-300 mt-[25px]" />
                        <div className="text-sm leading-relaxed px-2 mt-4 font-local2" style={{ color: '#666666' }}>
                            You can use these account details to log in on both myWeb and Examin. Any changes to these details will impact both the Sites.
                            <br />
                            By continuing, you acknowledge that you are 18 years and above, and you accept our{' '}
                            <a href="#" className="text-blue-500 hover:text-blue-600 no-underline">
                                Terms of service
                            </a>
                            ,{' '}
                            <a href="#" className="text-blue-500 hover:text-blue-600 no-underline">
                                Privacy policy
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;
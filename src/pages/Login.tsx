import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import FFButton from '../components/common/FFButton';
import { CustomCountryCode } from '../types';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/apiService';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const allowedCountries: CustomCountryCode[] = ['NG', 'CM', 'GH', 'BJ', 'ZA'];

  const handleLogin = async () => {
    if (!value || !isPossiblePhoneNumber(value)) {
        alert('Please enter a valid phone number');
        return;
    }
    setIsLoading(true);
    try {
        const token = await loginUser("fastest_fingers_gh", "password");
        if (token) {
            setToken(token);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate("/");
            }, 1000);
        } else {
            alert('Failed to retrieve token');
        }
    } catch (error) {
        alert('Login failed');
        console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-inria text-ffgray mx-6 my-10">
      <div className="bg-[#f9f9f9] py-16 px-8 rounded shadow-custom w-full md:w-[610px] text-center">
        <img src="/images/FFlogo.svg" alt="Logo" className=" mx-auto h-8" />
        <h2 className="font-semibold my-2 italic">Play For Fun, Play For Cash!</h2>
        <div className="my-10  mx-auto md:w-3/5">
          <label htmlFor="phone" className="block text-left text-xs italic mb-2 text-ffgray/70">Phone Number Input</label>
          <PhoneInput
            international
            defaultCountry="NG"
            value={value}
            onChange={setValue}
            className="custom-phone-input"
            countries={allowedCountries}
          />
        </div>
        <FFButton loading={isLoading} text={isLoading ? 'Loading...' : 'Next'} className="w-full md:w-3/5 mx-auto mt-20" onClick={handleLogin} disabled={!value || !isPossiblePhoneNumber(value)} />
      </div>
      {showPopup && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white border border-green-500 p-4 rounded">
                    Login Successful!
                </div>
            )}
      <div className='my-8 text-center hidden'>
        <p className='bg-[#009A4933] py-4 px-24 italic shadow-custom'>An OTP has been Sent</p>
        <p className=' mt-2 text-ffgreen  font-bold'>04:00</p>
      </div>

    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import FFButton from '../components/common/FFButton';
import { CustomCountryCode } from '../types';



const Login: React.FC = () => {
  const [value, setValue] = useState<string>();
  const allowedCountries:CustomCountryCode[] = ['NG', 'CM', 'GH', 'BJ', 'ZA'];

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
        <FFButton text="Next" className="w-full md:w-3/5 mx-auto mt-20" disabled={!value || !isPossiblePhoneNumber(value)} />
      </div>
      <div className='my-8 text-center'>
        <p className='bg-[#009A4933] py-4 px-24 italic shadow-custom'>An OTP has been Sent</p>
        <p className=' mt-2 text-ffgreen  font-bold'>04:00</p>
      </div>

    </div>
  );
};

export default Login;

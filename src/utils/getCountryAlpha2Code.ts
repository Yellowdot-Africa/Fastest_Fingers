
import { CustomCountryCode } from '../types';

export function getCountryAlpha2Code(phoneNumber: string, allowedCountries: CustomCountryCode[]): string | null {
  const countryCallingCodes = {
    '233': 'GH',
    '234': 'NG',
    '237': 'CM',
    '225': 'CI',
    '229': 'BJ',
    '27': 'ZA',
  };

  const callingCode = phoneNumber.slice(0, 3);
  const alpha2Code = countryCallingCodes[callingCode as keyof typeof countryCallingCodes];

  if (alpha2Code && allowedCountries.includes(alpha2Code as CustomCountryCode)) {
    localStorage.setItem('countryAlpha2Code', alpha2Code);
    return alpha2Code;
  }

  return null;
}

// import { PhoneNumberUtil } from 'google-libphonenumber';
// import { CustomCountryCode } from '../types';

// const phoneUtil = PhoneNumberUtil.getInstance();

// export function getCountryAlpha2Code(phoneNumber: string, allowedCountries: CustomCountryCode[]): string | null {
//   try {

//     const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
//     const number = phoneUtil.parse(formattedPhoneNumber, 'ZZ');

//     if (phoneUtil.isValidNumber(number)) {
//       const regionCode = phoneUtil.getRegionCodeForNumber(number);
//       if (regionCode && allowedCountries.includes(regionCode as CustomCountryCode)) {
//         localStorage.setItem('countryAlpha2Code', regionCode);
//         return regionCode;
//       }
//     }
//   } catch (error) {
//     console.error('Failed to parse phone number:', error);
//     return null;
//   }
//   return null;
// }

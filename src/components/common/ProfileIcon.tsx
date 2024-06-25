// HomeIcon.tsx
import React from 'react';
import { IconProps } from '../../types';

const ProfileIcon: React.FC<IconProps> = ({ active, className }) => (
    <svg className={`${className}`} width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path fillRule="evenodd" clipRule="evenodd" d="M7.66667 6.20833C7.66667 4.66124 8.28125 3.17751 9.37521 2.08354C10.4692 0.989581 11.9529 0.375 13.5 0.375C15.0471 0.375 16.5308 0.989581 17.6248 2.08354C18.7188 3.17751 19.3333 4.66124 19.3333 6.20833C19.3333 7.75543 18.7188 9.23916 17.6248 10.3331C16.5308 11.4271 15.0471 12.0417 13.5 12.0417C11.9529 12.0417 10.4692 11.4271 9.37521 10.3331C8.28125 9.23916 7.66667 7.75543 7.66667 6.20833ZM7.66667 14.9583C5.7328 14.9583 3.87813 15.7266 2.51068 17.094C1.14323 18.4615 0.375 20.3161 0.375 22.25C0.375 23.4103 0.835936 24.5231 1.65641 25.3436C2.47688 26.1641 3.58968 26.625 4.75 26.625H22.25C23.4103 26.625 24.5231 26.1641 25.3436 25.3436C26.1641 24.5231 26.625 23.4103 26.625 22.25C26.625 20.3161 25.8568 18.4615 24.4893 17.094C23.1219 15.7266 21.2672 14.9583 19.3333 14.9583H7.66667Z"
            strokeWidth="0.9"
            fill="black"
            fillOpacity={active ? "" : "0.4"}
            stroke={active ? "#00F0FF" : ""}
        />

    </svg>
);

export default ProfileIcon;

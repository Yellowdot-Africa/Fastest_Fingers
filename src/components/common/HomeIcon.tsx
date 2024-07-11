import React from 'react';
import { IconProps } from '../../types';

const HomeIcon: React.FC<IconProps> = ({ active }) => (
    <svg width="21" height="23" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.66618 0.168046C9.5543 0.0595954 9.41192 0 9.26471 0C9.11749 0 8.97511 0.0595954 8.86324 0.168046L0 8.77803V18.9C0 19.457 0.19522 19.9911 0.542714 20.3849C0.890208 20.7788 1.36151 21 1.85294 21H6.79412C6.95793 21 7.11503 20.9263 7.23086 20.795C7.34669 20.6637 7.41176 20.4857 7.41176 20.3V16.1C7.41176 15.5431 7.60698 15.0089 7.95448 14.6151C8.30197 14.2213 8.77328 14 9.26471 14C9.75614 14 10.2274 14.2213 10.5749 14.6151C10.9224 15.0089 11.1176 15.5431 11.1176 16.1V20.3C11.1176 20.4857 11.1827 20.6637 11.2986 20.795C11.4144 20.9263 11.5715 21 11.7353 21H16.6765C17.1679 21 17.6392 20.7788 17.9867 20.3849C18.3342 19.9911 18.5294 19.457 18.5294 18.9V8.77803L9.66618 0.168046Z"
            strokeWidth="0.9"
            fill="black"
            fillOpacity={active ? "" : "0.4"}
            stroke={active ? "#00F0FF" : ""}
        />

    </svg>
);

export default HomeIcon;

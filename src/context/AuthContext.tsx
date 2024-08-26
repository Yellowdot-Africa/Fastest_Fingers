import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
    token: string;
    msisdn: string;
    profile: UserProfile | null;
    isSubscribed: boolean;
    setToken: (token: string) => void;
    setMsisdn: (msisdn: string) => void;
    setProfile: (profile: Partial<UserProfile>) => void;
    setIsSubscribed: (isSubscribed: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string>(() => sessionStorage.getItem('token') || '');
    const [msisdn, setMsisdn] = useState<string>(() => sessionStorage.getItem('msisdn') || '');
    const [profile, setProfile] = useState<UserProfile | null>(() => {
        const profileData = sessionStorage.getItem('profile');
        return profileData ? JSON.parse(profileData) : null;
    });
    const [isSubscribed, setIsSubscribed] = useState<boolean>(() => sessionStorage.getItem('isSubscribed') === 'true');

    useEffect(() => {
        const tokenExpirationTime = sessionStorage.getItem('tokenExpirationTime');
        if (tokenExpirationTime && new Date().getTime() > parseInt(tokenExpirationTime, 10)) {
            logout();
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('msisdn', msisdn);
        sessionStorage.setItem('profile', JSON.stringify(profile));
        sessionStorage.setItem('isSubscribed', isSubscribed.toString());
    }, [token, msisdn, profile, isSubscribed]);

    const setTokenWithExpiration = (newToken: string) => {
        setToken(newToken);
        const expirationTime = new Date().getTime() + 3600000; // Example: 1 hour
        sessionStorage.setItem('tokenExpirationTime', expirationTime.toString());
    };

    const updateProfile = (profileData: Partial<UserProfile>) => {
        const completeProfile: UserProfile = {
            msisdn: profileData.msisdn || msisdn,
            nickname: profileData.nickname || '',
            avatar: profileData.avatar || 0,
            bank: profileData.bank || '',
            accountNumber: profileData.accountNumber || '',
            accountName: profileData.accountName || ''
        };
        setProfile(completeProfile);
    };

    const logout = () => {
        sessionStorage.clear();
        setToken('');
        setMsisdn('');
        setProfile(null);
        setIsSubscribed(false);
    };

    return (
        <AuthContext.Provider value={{ token, msisdn, profile, setToken: setTokenWithExpiration, setMsisdn, setProfile: updateProfile, isSubscribed, setIsSubscribed, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
    token: string;
    msisdn: string;
    profile: UserProfile | null;
    setToken: (token: string) => void;
    setMsisdn: (msisdn: string) => void;
    setProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState('');
    const [msisdn, setMsisdn] = useState('');
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const handleSetProfile = (profileData: Partial<UserProfile>) => {
        // default state
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

    return (
        <AuthContext.Provider value={{ token, msisdn, profile, setToken, setMsisdn, setProfile: handleSetProfile }}>
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

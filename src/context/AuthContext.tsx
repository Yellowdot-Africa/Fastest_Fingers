import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    token: string;
    msisdn: string;
    setToken: (token: string) => void;
    setMsisdn: (msisdn: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [token, setToken] = useState('');
    const [msisdn, setMsisdn] = useState('');

    return (
        <AuthContext.Provider value={{ token, msisdn, setToken, setMsisdn }}>
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

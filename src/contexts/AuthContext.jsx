import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Retrieve from localStorage for mock login
        const saved = localStorage.getItem("mockUser");
        if (saved) {
            const { email: savedEmail, fullName } = JSON.parse(saved);
            setUser({ email: savedEmail, fullName });
        } else {
            setUser({ email, fullName: "User" });
        }
        return Promise.resolve();
    };

    const register = (email, password, fullName) => {
        // Save to localStorage for mock persistence
        localStorage.setItem("mockUser", JSON.stringify({ email, fullName }));
        setUser({ email, fullName });
        return Promise.resolve();
    };
    // Example in AuthContext.js
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

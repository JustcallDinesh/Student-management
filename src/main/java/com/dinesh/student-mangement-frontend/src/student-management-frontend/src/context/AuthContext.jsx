import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Invalid stored user:", error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const login = (userData) => {

        const loggedInUser = {
            username: userData.username,
            role: userData.role,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            tokenType: userData.tokenType || "Bearer"
        };

        localStorage.setItem(
            "user",
            JSON.stringify(loggedInUser)
        );

        // API clients read these values directly when attaching the JWT to requests.
        localStorage.setItem("accessToken", loggedInUser.accessToken);

        if (loggedInUser.refreshToken) {
            localStorage.setItem("refreshToken", loggedInUser.refreshToken);
        } else {
            localStorage.removeItem("refreshToken");
        }

        setUser(loggedInUser);
    };

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setUser(null);
    };

    const isAuthenticated = !!user;

    const role = user?.role || null;

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated,
                role
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

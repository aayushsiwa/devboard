import React, { createContext, useContext, useState, useEffect } from "react";

interface DashboardPreferences {
    showPrivateRepos: boolean;
    togglePrivateRepos: () => void;
    showRateLimit: boolean;
    toggleRateLimit: () => void;
}

const DashboardPreferencesContext = createContext<DashboardPreferences | null>(null);

export const useDashboardPreferences = () => {
    const context = useContext(DashboardPreferencesContext);
    if (!context) {
        throw new Error("useDashboardPreferences must be used within DashboardPreferencesProvider");
    }
    return context;
};

export const DashboardPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
    const [showPrivateRepos, setShowPrivateRepos] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("showPrivateRepos");
            return stored === "true";
        }
        return false;
    });

    const [showRateLimit, setShowRateLimit] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("showRateLimit");
            return stored === "true";
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem("showPrivateRepos", String(showPrivateRepos));
    }, [showPrivateRepos]);

    useEffect(() => {
        localStorage.setItem("showRateLimit", String(showRateLimit));
    }, [showRateLimit]);

    const togglePrivateRepos = () => setShowPrivateRepos((prev) => !prev);
    const toggleRateLimit = () => setShowRateLimit((prev) => !prev);

    return (
        <DashboardPreferencesContext.Provider
            value={{ showPrivateRepos, togglePrivateRepos, showRateLimit, toggleRateLimit }}
        >
            {children}
        </DashboardPreferencesContext.Provider>
    );
};

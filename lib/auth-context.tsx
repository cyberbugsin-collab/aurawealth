"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Mock user type that mirrors Firebase User structure
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "user" | "admin";
}

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USERS = {
  "user@demo.com": {
    password: "demo123",
    user: {
      uid: "user-001",
      email: "user@demo.com",
      displayName: "John Doe",
      photoURL: null,
      role: "user" as const,
    },
  },
  "admin@demo.com": {
    password: "admin123",
    user: {
      uid: "admin-001",
      email: "admin@demo.com",
      displayName: "Admin User",
      photoURL: null,
      role: "admin" as const,
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const storedUser = localStorage.getItem("wealthview_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("wealthview_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS];
    
    if (!demoUser || demoUser.password !== password) {
      throw new Error("Invalid credentials");
    }

    setUser(demoUser.user);
    localStorage.setItem("wealthview_user", JSON.stringify(demoUser.user));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("wealthview_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

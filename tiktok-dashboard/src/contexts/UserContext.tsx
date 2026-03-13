"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole, users as mockUsers } from "@/lib/mockData";
import { hasPermission, canAccessModule, ModuleKey, ActionType } from "@/lib/permissions";

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (userId: string) => void;
  logout: () => void;
  hasPermission: (module: ModuleKey, action?: ActionType) => boolean;
  canAccessModule: (module: ModuleKey) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "tiktok_dashboard_user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时从 localStorage 恢复用户状态
  useEffect(() => {
    const storedUserId = localStorage.getItem(STORAGE_KEY);
    if (storedUserId) {
      const user = mockUsers.find((u) => u.id === storedUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem(STORAGE_KEY, userId);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const checkPermission = (module: ModuleKey, action: ActionType = "view"): boolean => {
    if (!currentUser) return false;
    return hasPermission(currentUser.role, module, action);
  };

  const checkCanAccessModule = (module: ModuleKey): boolean => {
    if (!currentUser) return false;
    return canAccessModule(currentUser.role, module);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        logout,
        hasPermission: checkPermission,
        canAccessModule: checkCanAccessModule,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

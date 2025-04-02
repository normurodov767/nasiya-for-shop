import { create } from "zustand";



interface User {
  id: number;
  username: string;
  name: string;
}

interface Group {
  id: number;
  name: string;
}

interface StoreState {
 

  user: User | null;
  setUser: (user: User | null) => void;

  groups: Group[];
  addGroup: (newGroup: Group) => void;

  logout: () => void;
}

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToLocalStorage = (key: string, value: unknown) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};

export const useStore = create<StoreState>((set) => ({

  user: getFromLocalStorage<User | null>("user", null),
  setUser: (user) =>
    set(() => {
      saveToLocalStorage("user", user);
      return { user };
    }),

  groups: getFromLocalStorage<Group[]>("groups", []),
  addGroup: (newGroup) =>
    set((state) => {
      const updatedGroups = [...state.groups, newGroup];
      saveToLocalStorage("groups", updatedGroups);
      return { groups: updatedGroups };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null };
    }),
}));

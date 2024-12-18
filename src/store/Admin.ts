import { create } from "zustand";

interface IAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: String;
  role: string;
}

interface AdminState {
  admin: IAdmin | null;
  sign: (value: IAdmin | null) => void;
}

const useAdminStore = create<AdminState>()((set) => ({
  admin: null,
  sign: (value) => set(() => ({ admin: value })),
}));

export default useAdminStore;

import { create } from "zustand";
import { getToken, request, setToken as _setToken } from "../utils";
import type UserInfo from "../types/UserInfo";

interface ITokenStore {
  token: string;
  fetchLogin: (loginForm: UserInfo) => Promise<void>;
  setToken: (token: string) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  token: getToken() || "",
  fetchLogin: async (loginForm: UserInfo) => {
    const res = await request.post("/login", loginForm);
    set({ token: res.data.token });
    _setToken(res.data.token);
  },
  setToken: (token: string) => {
    set({ token });
    _setToken(token);
  },
}));

export default useTokenStore;
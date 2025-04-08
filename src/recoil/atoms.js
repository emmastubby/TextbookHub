import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionData",
  storage: localStorage,
});

export const authState = atom({
  key: "authState",
  default: {
    userID: null,
    userName: null,
    userEmail: null,
    isLoggedIn: false,
  },
  effects_UNSTABLE: [persistAtom],
});

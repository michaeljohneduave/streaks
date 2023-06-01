import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { mergeDeepLeft } from "ramda";

type State = {
  email: string;
  name: string;
  photoURL: string;
  isLoggedIn: boolean;
};

type Actions = {
  setEmail: (email: string) => void;
  setLogin: (email: string, name: string, photoURL: string) => void;
  setLogout: () => void;
};

export default create(
  persist(
    immer<State & Actions>((set) => ({
      email: "",
      name: "",
      photoURL: "",
      isLoggedIn: false,

      setEmail(email: string) {
        set((state) => {
          state.email = email;
        });
      },
      setLogin(email, name, photoURL) {
        set((state) => {
          state.email = email;
          state.name = name;
          state.photoURL = photoURL;
          state.isLoggedIn = true;
        });
      },
      setLogout() {
        set((state) => {
          state.email = "";
          state.name = "";
          state.photoURL = "";
          state.isLoggedIn = false;
        });
      },
    })),
    {
      name: "auth",
    }
  )
);

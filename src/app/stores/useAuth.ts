import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  email: string;
  name: string;
  photoURL: string;
  isLoggedIn: boolean;
};

type Actions = {
  setEmail: (email: string) => void;
  login: (email: string, name: string, photoURL: string) => void;
  logout: () => void;
};

export default create(
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
    login(email, name, photoURL) {
      set((state) => {
        state.email = email;
        state.name = name;
        state.photoURL = photoURL;
        state.isLoggedIn = true;
      });
    },
    logout() {
      set((state) => {
        state.email = "";
        state.name = "";
        state.photoURL = "";
        state.isLoggedIn = false;
      });
    },
  }))
);

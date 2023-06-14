import {
  getAuth,
  onAuthStateChanged,
  browserLocalPersistence,
} from "firebase/auth";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import app from "@/firebase/config";

type State = {
  email: string;
  name: string;
  photoURL: string;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
};

type Actions = {
  setEmail: (email: string) => void;
  setLoggingIn: () => void;
  setLogin: (email: string, name: string, photoURL: string) => void;
  setLogout: () => void;
};

const auth = getAuth(app);

auth.setPersistence(browserLocalPersistence);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user", user);
    store.setState({
      email: user.email || "",
      name: user.displayName || "",
      photoURL: user.photoURL || "",
      isLoggedIn: true,
    });
  } else {
    store.setState({
      email: "",
      name: "",
      photoURL: "",
      isLoggedIn: false,
    });
  }
});

const store = create(
  immer<State & Actions>((set) => ({
    email: "",
    name: "",
    photoURL: "",
    isLoggedIn: false,
    isLoggingIn: false,

    setEmail(email: string) {
      set((state) => {
        state.email = email;
      });
    },

    setLoggingIn() {
      set((state) => {
        state.isLoggingIn = true;
      });
    },

    setLogin(email, name, photoURL) {
      set((state) => {
        state.email = email;
        state.name = name;
        state.photoURL = photoURL;
        state.isLoggedIn = true;
        state.isLoggingIn = false;
      });
    },
    setLogout() {
      auth.signOut();

      set((state) => {
        state.email = "";
        state.name = "";
        state.photoURL = "";
        state.isLoggedIn = false;
      });
    },
  }))
);

export default store;

"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { XSquare } from "lucide-react";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signInGoogle, signInPasswordless } from "@/firebase/auth/signin";
import useAuth from "../stores/useAuth";
import ProfileMenu from "./ProfileMenu";
import { useGetFromAuth } from "../hooks/zustand";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const setLogin = useAuth((state) => state.setLogin);
  const setLogout = useAuth((state) => state.setLogout);
  const name = useGetFromAuth(useAuth, (state) => state.name);
  const photoURL = useGetFromAuth(useAuth, (state) => state.photoURL);
  const isLoggedIn = useGetFromAuth(useAuth, (state) => state.isLoggedIn);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    window.localStorage.setItem("email", form.get("email") as string);
    await signInPasswordless(form.get("email") as string);
    setShowModal(false);
  };

  const handleGoogleSignIn = async () => {
    const response = await signInGoogle();

    if (response.email && response.displayName) {
      setLogin(response.email, response.displayName, response.photoURL || "");
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <Modal>
          <div
            x-show="open"
            className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, .5)" }}
          >
            <div className="bg-white rounded shadow-lg w-1/3">
              <header className="border-b p-4 text-lg font-semibold">
                <div className="flex items-center">
                  <span>Sign In</span>
                  <span
                    className="ml-auto cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    <XSquare />
                  </span>
                </div>
              </header>
              <main className="p-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      required
                    />
                    <Button className="min-w-max" type="submit">
                      Sign In
                    </Button>
                  </div>
                </form>
                <div className="mt-2">
                  <span className="text-center text-gray-500 text-xs">
                    Or Sign up Using:
                  </span>
                </div>
                <div className="flex mt-2 gap-1">
                  <Button className="text-xl" onClick={handleGoogleSignIn}>
                    <FcGoogle />
                  </Button>
                  <Button className="text-xl">
                    <FaGithub />
                  </Button>
                </div>
              </main>
            </div>
          </div>
        </Modal>
      ) : null}
      {isLoggedIn ? (
        <ProfileMenu
          name={name || ""}
          photoURL={photoURL || ""}
          logout={setLogout}
        />
      ) : (
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          Sign In
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { XSquare } from "lucide-react";
import { Modal, ModalBody, ModalHeader } from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signInGoogle, signInPasswordless } from "@/firebase/auth";
import useAuth from "../stores/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const setLogin = useAuth((state) => state.setLogin);

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
      router.push("/dashboard");
    }
  };

  return (
    <>
      {showModal ? (
        <Modal>
          <div className="bg-white rounded-2xl shadow-lg w-1/3">
            <ModalHeader>
              <div className="flex items-center p-4">
                <span>Sign In</span>
                <span
                  className="ml-auto cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  <XSquare />
                </span>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-3 p-4">
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
                <div>
                  <span className="text-center text-gray-500 text-lg">
                    Or Sign up using:
                  </span>
                </div>
                <div className="flex space-x-5">
                  <Button className="h-max" onClick={handleGoogleSignIn}>
                    <FaGoogle size={32} />
                  </Button>
                  <Button className="h-max">
                    <FaGithub size={32} />
                  </Button>
                  <Button className="h-max">
                    <FaFacebook size={32} />
                  </Button>
                </div>
              </div>
            </ModalBody>
          </div>
        </Modal>
      ) : null}
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        Sign In
      </div>
    </>
  );
}

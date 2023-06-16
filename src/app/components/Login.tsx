"use client";

import { useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { XSquare } from "lucide-react";
import { Modal, ModalBody, ModalHeader } from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {};

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/dashboard" });
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

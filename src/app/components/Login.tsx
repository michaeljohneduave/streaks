"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { XSquare } from "lucide-react";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Login() {
  const [showModal, setShowModal] = useState(false);

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
                <div className="flex w-full items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button className="min-w-max" type="submit">
                    Sign In
                  </Button>
                </div>
                <div className="mt-2">
                  <span className="text-center text-gray-500 text-xs">
                    Or Sign up Using:
                  </span>
                </div>
                <div className="flex mt-2 gap-1">
                  <Button className="text-xl">
                    <FcGoogle />
                  </Button>
                  <Button className="text-xl">
                    <FaGithub />
                  </Button>
                </div>
              </main>
              <footer className="border-t p-4 text-right">
                <Button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2"
                >
                  Close
                </Button>
              </footer>
            </div>
          </div>
        </Modal>
      ) : null}
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        Sign In
      </div>
    </>
  );
}

"use client";

import { signInPasswordlessConfirm } from "@/firebase/auth/signin";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import useAuth from "../stores/useAuth";

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFilled, setEmailFilled] = useState(false);
  const login = useAuth((state) => state.login);

  useEffect(() => {
    const email = window.localStorage.getItem("email");

    if (email) {
      setEmail(email);
      setEmailFilled(true);
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    setIsLoading(true);
    const result = await signInPasswordlessConfirm(email, window.location.href);
    setIsLoading(false);

    if (result.email) {
      let n = result.displayName || "";

      if (form.get("name")) {
        n = form.get("name") as string;
      }

      login(result.email, n, result.photoURL || "");
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="m-3 w-[400px]">
          <CardHeader>
            <CardTitle>Confirm your account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" placeholder="Name" />
              </div>
              <div className="flex flex-col space-y-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={email}
                  disabled={emailFilled}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                Confirm
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

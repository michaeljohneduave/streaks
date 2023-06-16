"use client";

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

export default function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFilled, setEmailFilled] = useState(false);

  useEffect(() => {
    const email = window.localStorage.getItem("email");
    window.localStorage.removeItem("email");

    if (email) {
      setEmail(email);
      setEmailFilled(true);
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {};

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
                <Input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Name"
                />
              </div>
              <div className="flex flex-col space-y-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
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

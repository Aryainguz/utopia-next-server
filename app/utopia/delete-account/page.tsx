"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Delete() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
        try {
            const response = await fetch("/api/v1/user/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer LoremI[psum]&inguz.dev",
            },
            body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
            alert("Account deleted successfully");

            // refresh the page
            window.location.reload();

            } else {
            alert("Failed to delete account");
            window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Delete Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Are you sure you want to permanently delete your Utopia account?
            This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 ">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2 my-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => handleSubmit()}
          >
            Confirm Deletion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

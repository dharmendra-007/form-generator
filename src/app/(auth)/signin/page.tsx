"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { SignInFormData, signInSchema } from "@/schemas/authSchema";
import API from "@/lib/axios";
import { toast } from "sonner";

export default function SignIn() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
setIsLoading(true);
    setError(null);
    API.post("/api/v1/auth/signin",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message)
        login(res.data)
      })
      .catch((error) => {
        const message = error.response?.data?.message || "An error occurred";
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userEmail" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="userEmail"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
                {...register("userEmail")}
              />
              {errors.userEmail && (
                <p className="text-sm text-red-400">
                  {errors.userEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userPassword" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="userPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                  disabled={isLoading}
                  {...register("userPassword")}
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.userPassword && (
                <p className="text-sm text-red-400">
                  {errors.userPassword.message}
                </p>
              )}
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="bg-red-900/50 border-red-800"
              >
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="!h-4 !w-4 animate-spin"/> : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

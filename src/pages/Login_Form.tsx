import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";

interface FormData {
  userid: string;
  password: string;
  rememberMe: boolean;
}

interface UserRecord {
  USER_ID: string;
  PASSWORDS: string;
  [key: string]: any;
}

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userid: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    userid: "",
    password: "",
  });

  const validateuserid = (userid: string) => {
    return userid.trim().length > 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  const validateForm = () => {
    const newErrors = { userid: "", password: "" };
    let isValid = true;

    if (!formData.userid) {
      newErrors.userid = "User Id is required";
      isValid = false;
    } else if (!validateuserid(formData.userid)) {
      newErrors.userid = "Please enter a valid User Id";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/userdata.json");
      const users: UserRecord[] = await response.json();

      const matchedUser = users.find(
        (user) =>
          user.USER_ID === formData.userid &&
          user.PASSWORDS === formData.password
      );

      if (matchedUser) {
        toast({
          title: "Login successful",
          description: "Welcome back to your account!",
        });

        navigate("/home-page");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid User ID or Password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="userid"
            className="text-sm font-medium text-black flex items-center gap-2"
          >
            <Mail className="h-4 w-4 text-black" />
            USER ID
          </Label>
          <div className="relative">
            <Input
              id="userid"
              name="userid"
              type="text"
              placeholder="User ID"
              value={formData.userid}
              onChange={handleInputChange}
              className={`bg-white border border-gray-300 text-black placeholder:text-gray-400 h-11 ${
                errors.userid ? "border-red-500" : "focus:border-black"
              }`}
            />
            {errors.userid && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1"
              >
                {errors.userid}
              </motion.p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-black flex items-center gap-2"
          >
            <Lock className="h-4 w-4 text-black" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className={`bg-white border border-gray-300 text-black placeholder:text-gray-400 h-11 ${
                errors.password ? "border-red-500" : "focus:border-black"
              }`}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-xs mt-1"
              >
                {errors.password}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={handleCheckboxChange}
            className="border-black data-[state=checked]:bg-black data-[state=checked]:border-black"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-black cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <a
          href="#"
          className="text-sm text-black hover:underline transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

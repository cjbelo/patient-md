import type { FormEvent } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PulseIcon, UserIcon, VideoCameraIcon } from "@phosphor-icons/react";
import { login } from "@/utils/auth";
import { APP_NAME } from "@/utils/constants";
import { EMAIL_RE } from "@/utils/regex";
import LoginEmailField from "@/components/LoginEmailField";
import LoginPasswordField from "@/components/LoginPasswordField";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email.";
    if (!password.trim()) next.password = "Password is required.";
    else if (password.trim().length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    login(email.trim());
    navigate("/dashboard", { replace: true });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-100 to-green-100 items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <div className="bg-blue-500 p-3 rounded-lg mr-4">
              <PulseIcon className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-dark">{APP_NAME}</h1>
          </div>
          <p className="text-gray-600 mb-8">
            Modern patient management system designed for healthcare professionals to streamline workflows and improve
            patient care.
          </p>
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
              <UserIcon className="text-blue-500 w-6 h-6 mb-2" />
              <h3 className="font-semibold text-dark mb-1">Patient Management</h3>
              <p className="text-gray-500 text-sm">Organize and track patient records efficiently</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
              <VideoCameraIcon className="text-blue-500 w-6 h-6 mb-2" />
              <h3 className="font-semibold text-dark mb-1">Video Consultations</h3>
              <p className="text-gray-500 text-sm">Secure telemedicine platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-500 p-2 rounded-lg mr-3">
                <PulseIcon className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-dark">{APP_NAME}</h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-dark mb-1">Welcome back</h2>
            <p className="text-gray-500 mb-6">Sign in to your account to continue</p>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <LoginEmailField value={email} onChange={handleChangeEmail} error={errors.email} />
              <LoginPasswordField value={password} onChange={handleChangePassword} error={errors.password} />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition pointer-fine:hover:-translate-y-1 active:scale-98"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="#" className="text-blue-500 font-medium hover:text-blue-700">
                  Sign up
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

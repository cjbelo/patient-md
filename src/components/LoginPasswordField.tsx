import type React from "react";
import { LockIcon } from "@phosphor-icons/react";

type Props = {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LoginPasswordField({
  id = "password",
  label = "Password",
  placeholder = "••••••••",
  value,
  error,
  onChange,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LockIcon className={["w-4 h-4", error ? "text-rose-400" : "text-gray-400"].join(" ")} />
        </div>
        <input
          type="password"
          id={id}
          className={[
            "pl-10 w-full px-4 py-2 rounded-lg border focus:border-blue-500",
            error ? "border-rose-500" : "border-gray-300",
          ].join(" ")}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

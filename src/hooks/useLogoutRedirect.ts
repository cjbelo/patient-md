import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/utils/auth";

type Options = {
  to?: string; // default: "/login"
  replace?: boolean; // default: true
  before?: () => void; // optional side-effect before logout
  after?: () => void; // optional side-effect after navigation
};

export function useLogoutRedirect(options?: Options) {
  const navigate = useNavigate();

  return useCallback(() => {
    options?.before?.();
    logout();
    navigate(options?.to ?? "/login", { replace: options?.replace ?? true });
    options?.after?.();
  }, [navigate, options?.to, options?.replace, options?.before, options?.after]);
}

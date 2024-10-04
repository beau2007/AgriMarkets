"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export default function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/";

  useEffect(() => {
    if (status === "unauthenticated" && !isAuthPage) {
      toast.error("Veuillez vous connecter pour accéder à cette page.");
      router.push("/login");
    }
  }, [status, router, isAuthPage]);

  if (status === "loading") {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <BarLoader color="black" />
        </div>
      </>
    );
  }

  if (!session && !isAuthPage) {
    return null; // La redirection sera gérée par useEffect
  }

  if (session) {
    return (
      <>
        <Toaster position="top-center" />
        <div className="mt-4 md:ml-0">{children}</div>
      </>
    );
  }

  // Pour les pages d'authentification ou si l'utilisateur n'est pas connecté
  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}

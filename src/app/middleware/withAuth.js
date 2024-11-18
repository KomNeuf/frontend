"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const loginUser = useSelector((state) => state.auth.loginUser);
    const router = useRouter();
    const pathname = usePathname();
    const lang = pathname?.split("/")[1];
    // useEffect(() => {
    //   if (!loginUser) {
    //     router.push(`/${lang}/login`);
    //   }
    // }, [loginUser, router]);

    return loginUser ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;

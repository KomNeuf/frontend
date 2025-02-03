"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const validLocales = ["en", "fr", "ar"];
    const pathLocale = pathname.split("/")[1];

    if (!validLocales.includes(pathLocale)) {
      router.push(`/fr${pathname}`);
    }
  }, [pathname]);

  return <main />;
}

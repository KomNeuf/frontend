import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ErrorBlock({ error, className, style }) {
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    if (error?.data?.message === "invalid token!") {
      console.log(error);
      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
        router.push(
          "/backoffice/sign-in?message=Previous_session_has_expired,_sign_in"
        );
      }
    }
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [error]);

  return (
    <>
      {error?.data &&
        (typeof error?.data.message === "string" ? (
          <div
            ref={containerRef}
            style={style}
            className={`${className} bg-red-100 p-3 rounded-md text-center`}
          >
            <p className="text-center text-red-600 font-semibold text-md">
              {error?.data?.message}
            </p>
          </div>
        ) : (
          <div
            ref={containerRef}
            style={style}
            className={`${className} bg-red-100 flex flex-col g-3 p-4 rounded-md text-center`}
          >
            {error?.data?.message?.map((res, index) => (
              <p key={index} className="capitalize text-red-600 text-md">
                {res}
              </p>
            ))}
          </div>
        ))}
    </>
  );
}

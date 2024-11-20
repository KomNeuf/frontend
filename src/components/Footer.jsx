"use client";
import langs from "@/app/[lang]/dictionaries/langs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ lang }) => {
  const t = langs[lang]?.footer;

  const router = useRouter();
  const handleClick = (subcategory) => {
    router.push(
      `/${lang}/searchResult?query=${encodeURIComponent(subcategory)}`
    );
  };
  return (
    <footer
      className="w-full py-14 bg-primaryGray "
      style={{
        clipPath: "polygon(0 0, 100% 8%, 100% 100%, 0% 100%)",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="https://Komneuf.ma" className="flex justify-center ">
            {/* <div className="text-center">
              <p
                className="text-3xl font-bold text-primaryText"
                style={{
                  fontFamily: "Lobster, cursive",
                  fontStyle: "italic",
                }}
              >
                KomNeuf
              </p>
              <p
                className="text-xs font-bold  text-secondaryText"
                style={{
                  fontFamily: "Proxima Nova, sans-serif",
                  fontStyle: "italic",
                }}
              >
                Quality second-hand clothes
              </p>
            </div> */}
            <img src="/logpMain.png" alt="Logo" className="w-60 h-full " />
          </Link>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-12 border-b border-black">
            <li>
              <button
                onClick={() => handleClick("Men")}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.men}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClick("Women")}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.women}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClick("Kids")}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.kids}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClick("Traditional Wear")}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.traditionalWear}
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => handleClick("KiffNew Shop")}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.shop}
              </button>
            </li> */}
          </ul>

          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-3 mb-10 border-b border-black">
            <li>
              <Link
                href={`/${lang}/about`}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.aboutUs}
              </Link>
            </li>

            <li>
              <Link
                href={`/${lang}/advertising`}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.advertising}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/contact-us`}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.contactUs}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/how-works`}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.howItWorks}
              </Link>
            </li>
            <li>
              <Link
                href={`/${lang}/termsAndConditions`}
                className="text-gray-800 hover:text-gray-900"
              >
                {t?.termsAndConditions}
              </Link>
            </li>
          </ul>

          <div className="flex space-x-10 justify-center items-center mb-12">
            <Link
              href="https://www.tiktok.com/@komneufmode?_t=8rWBbNkTscz&_r=1"
              target="_blank"
              className="block  text-gray-900 transition-all duration-500 hover:text-primaryText "
            >
              <svg
                className="w-[1.688rem] h-[1.688rem] "
                viewBox="0 0 448 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link
              target="_blank"
              href=" https://www.facebook.com/groups/komneuf"
              className="block  text-gray-900 transition-all duration-500 hover:text-primaryText "
            >
              <svg
                className="w-[0.938rem] h-[1.625rem]"
                viewBox="0 0 15 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7926 14.4697L14.5174 9.86889H10.0528V6.87836C10.0528 5.62033 10.6761 4.39105 12.6692 4.39105H14.7275V0.473179C13.5289 0.282204 12.3177 0.178886 11.1037 0.164062C7.42917 0.164062 5.0302 2.37101 5.0302 6.36077V9.86889H0.957031V14.4697H5.0302V25.5979H10.0528V14.4697H13.7926Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/komneufmode?igsh=MXE4bDR5dHZkdTIxdQ=="
              target="_blank"
              className="block  text-gray-900 transition-all duration-500 hover:text-primaryText "
            >
              <svg
                className="w-[1.688rem] h-[1.688rem] "
                viewBox="0 0 512 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="currentColor"
                  d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294zM149.977 1.773c-27.239 1.286-45.843 5.648-62.101 12.019-16.829 6.561-31.095 15.353-45.286 29.603C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.548 1.302 27.231 5.649 45.827 12.019 62.092 6.569 16.83 15.353 31.089 29.611 45.289 14.25 14.2 28.55 22.918 45.404 29.438 16.282 6.294 34.902 10.583 62.15 11.777 27.305 1.203 36.022 1.468 105.521 1.336 69.532-.133 78.25-.44 105.555-1.734 27.239-1.302 45.826-5.664 62.1-12.019 16.829-6.585 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.404 6.304-16.282 10.592-34.904 11.777-62.134 1.195-27.323 1.478-36.049 1.344-105.557-.133-69.516-.447-78.225-1.741-105.522-1.294-27.256-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.08-29.602-45.288-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.304-34.903-10.6-62.15-11.778C333.747.164 325.03-.101 255.506.031c-69.507.133-78.224.431-105.529 1.742z"
                />
              </svg>

              {/* <svg
                className="w-[1.875rem] h-[1.375rem]"
                viewBox="0 0 30 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.3106 1.27838C27.5782 1.62071 28.5745 2.61957 28.9113 3.88573C29.524 6.18356 29.524 10.9809 29.524 10.9809C29.524 10.9809 29.524 15.7782 28.9113 18.076C28.5698 19.3469 27.5735 20.3457 26.3106 20.6834C24.0186 21.2977 14.8226 21.2977 14.8226 21.2977C14.8226 21.2977 5.63122 21.2977 3.33456 20.6834C2.06695 20.3411 1.07063 19.3422 0.73385 18.076C0.121094 15.7782 0.121094 10.9809 0.121094 10.9809C0.121094 10.9809 0.121094 6.18356 0.73385 3.88573C1.07531 2.61488 2.07162 1.61602 3.33456 1.27838C5.63122 0.664062 14.8226 0.664062 14.8226 0.664062C14.8226 0.664062 24.0186 0.664062 26.3106 1.27838ZM19.5234 10.9809L11.885 15.403V6.55872L19.5234 10.9809Z"
                  fill="currentColor"
                />
              </svg> */}
            </Link>
          </div>
          <span className="text-lg text-black text-center block">
            ©<a href="https://https://Komneuf.ma">komNeuf</a> 2024,{" "}
            {t?.reserved}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

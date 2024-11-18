import "./globals.css";
import ReduxProvider from "@/Providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "komneuf",
  description: "komneuf",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&family=Roboto:wght@100;300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer
          position="bottom-right"
          theme={"dark"}
          autoClose={3000}
        />
      </body>
    </html>
  );
}

import "./globals.css";
import ReduxProvider from "@/Providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Komneuf - Buy and Sell Fashion and More",
  description:
    "Discover a wide range of stylish clothing for men, women, and kids at Komneuf. Shop the latest trends in traditional and modern wear. Affordable prices, fast delivery, and secure shopping!",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

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
      </head>
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

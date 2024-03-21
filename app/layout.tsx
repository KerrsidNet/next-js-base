import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Slide, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:text-white"}>
        <Providers>
          {children}
          <ToastContainer
            className="ui-pnotify"
            closeButton={false}
            closeOnClick={true}
            draggable={false}
            position="top-right"
            hideProgressBar={true}
            autoClose={3000}
            containerId="default"
            theme="colored"
            transition={Slide}
            // enableMultiContainer={true}
          />
          <ToastContainer
            className="ui-pnotify stack-bottomleft"
            closeButton={false}
            closeOnClick={true}
            draggable={false}
            position="bottom-left"
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={3000}
            containerId="bottom-left"
            theme="colored"
            transition={Slide}
            // enableMultiContainer={true}
          />
          <ToastContainer
            className="ui-pnotify stack-bottomright"
            closeButton={false}
            closeOnClick={true}
            draggable={false}
            position="bottom-right"
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={3000}
            containerId="bottom-right"
            theme="colored"
            transition={Slide}
            // enableMultiContainer={true}
          />
          <ToastContainer
            className="ui-pnotify stack-bar-top"
            closeButton={false}
            closeOnClick={true}
            draggable={false}
            position="top-left"
            hideProgressBar={true}
            autoClose={3000}
            containerId="top-bar"
            theme="colored"
            transition={Slide}
            // enableMultiContainer={true}
          />
          <ToastContainer
            className="ui-pnotify stack-bar-bottom"
            closeButton={false}
            closeOnClick={true}
            draggable={false}
            position="bottom-left"
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={3000}
            containerId="bottom-bar"
            theme="colored"
            transition={Slide}
            // enableMultiContainer={true}
          />
        </Providers>
      </body>
    </html>
  );
}

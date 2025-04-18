import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Snap&Trace",
  description: "DXF Files Modifications Using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${raleway.variable} antialiased`} >
        <NotificationProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NotificationProvider>

        <ToastContainer position="top-right" autoClose={3000} />
        {/* 
        <NotificationProvider>
            <MyProvider>
              <TabProvider>{children}</TabProvider>
            </MyProvider>
        </NotificationProvider> */}
      </body>
    </html>
  );
}

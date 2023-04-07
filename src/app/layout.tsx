import NavBar from "shb/components/navbar";
import Slider from "shb/components/main-page/slider";
import "./globals.css";
import Footer from "shb/components/footer";
import React from "react";

export const metadata = {
  title: "Shirin Food blog",
  description: "Food Recepies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

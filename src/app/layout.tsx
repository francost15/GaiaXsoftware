import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Hack My Mind",
  description: "Aplicacion con Inteligencia Artificial para el Desarrollo Empresarial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="flex h-screen">
      <main>{children}</main> {/* Contenido principal */}
    </body>
  </html>
  );
}

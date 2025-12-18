import "./globals.css";
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Bitlinks - your trusted URL shortner",
  description: "bitlinks help you shorten your urls easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

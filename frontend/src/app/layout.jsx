
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Pixel Palace",
  description: "Your favorite online video game store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <header>
          <nav>
            <h1>{metadata.title}</h1>
            <Link href="/catalog">Catalog</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/autentication/login">Login</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© {new Date().getFullYear()} Pixel Palace</p>
        </footer>
      </body>
    </html>
  );
}

import "./globals.css";
import { getSEOTags } from "./seo";
import Nav from "./nav";
import { Footer } from "./footer";

export const metadata = getSEOTags({
  title: "Interfaces Blog",
  description:
    "A blog by Gabriele Costanza about technology, ai, programming, data engineering and cloud technologies.",
  canonicalUrlRelative: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-helvetica antialiased selection-[#DAA520]">
        <div className="lg:w-[45%] w-[90%] mx-auto">
          <Nav />
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}

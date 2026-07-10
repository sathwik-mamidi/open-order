import "./globals.css";

const siteUrl = "https://open-order.pages.dev";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Open Order",
  title: {
    default: "Open Order — Smarter QR Ordering",
    template: "%s — Open Order",
  },
  description:
    "AI-guided QR ordering that lifts ticket size, speeds up tables, and delights guests.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "restaurant ordering",
    "QR menu",
    "smart ordering",
    "restaurant technology",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Open Order",
    title: "Open Order — Smarter QR Ordering",
    description:
      "Explore a guided restaurant ordering flow built to make decisions faster and pairings more relevant.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

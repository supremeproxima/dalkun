import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Danat Alkun Steel Engineering - Premium Steel Fabrication Services",
    template: "%s | Danat Alkun Steel Engineering"
  },
  description: "Professional steel fabrication services in UAE. Precision engineering, custom steel structures, industrial fabrication, and commercial steel solutions. Quality craftsmanship with advanced machinery.",
  keywords: [
    "steel fabrication",
    "steel engineering",
    "custom steel structures",
    "industrial fabrication",
    "commercial steel",
    "steel welding",
    "metal fabrication",
    "UAE steel services",
    "precision engineering",
    "steel construction"
  ],
  authors: [{ name: "Danat Alkun Steel Engineering" }],
  creator: "Danat Alkun Steel Engineering",
  publisher: "Danat Alkun Steel Engineering",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://danatalkun.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danatalkun.com",
    title: "Danat Alkun Steel Engineering - Premium Steel Fabrication Services",
    description: "Professional steel fabrication services in UAE. Precision engineering, custom steel structures, industrial fabrication, and commercial steel solutions.",
    siteName: "Danat Alkun Steel Engineering",
    images: [
      {
        url: "/assets/home/banner.svg",
        width: 1200,
        height: 630,
        alt: "Danat Alkun Steel Engineering - Professional Steel Fabrication",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danat Alkun Steel Engineering - Premium Steel Fabrication Services",
    description: "Professional steel fabrication services in UAE. Precision engineering, custom steel structures, industrial fabrication, and commercial steel solutions.",
    images: ["/assets/home/banner.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Danat Alkun Steel Engineering",
    "description": "Professional steel fabrication services in UAE. Precision engineering, custom steel structures, industrial fabrication, and commercial steel solutions.",
    "url": "https://danatalkun.com",
    "logo": "https://danatalkun.com/assets/danat_logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971 50 261 7483",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE"
    },
    "sameAs": [
      "https://www.facebook.com/danatalkun",
      "https://wa.me/971502617483"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Steel Fabrication",
        "description": "Custom steel structures and industrial fabrication services"
      },
      {
        "@type": "Service", 
        "name": "Precision Engineering",
        "description": "High-precision steel cutting and welding services"
      },
      {
        "@type": "Service",
        "name": "Commercial Steel Solutions",
        "description": "Steel construction and commercial fabrication services"
      }
    ],
    "openingHours": "Mo-Th 09:00-21:00, Sa-Su 09:00-18:00"
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <div className="mt-20 md:mt-36">
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahil Gupta — Senior Product Manager | AI & LLM Products",
  description:
    "Senior Product Manager with 10+ years building AI-powered products. $20M+ ARR, 500K+ users, 2x Founder. Expert in LLM optimization, RAG, and scaling SaaS platforms.",
  openGraph: {
    title: "Sahil Gupta — Product Leader building AI that ships",
    description:
      "10+ years driving product success in SaaS, Fintech & AI. $20M ARR. 2x Founder.",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sahil Gupta",
              jobTitle: "Senior Product Manager",
              url: "https://sahilgupta.dev",
              description:
                "Senior Product Manager specializing in AI/LLM products with 10+ years of experience.",
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

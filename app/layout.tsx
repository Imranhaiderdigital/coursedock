import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CourseDock — Learn Smarter. Build Faster.",
  description: "Discover thousands of carefully organized learning resources from multiple categories including Amazon, AI, Programming, Design, Marketing and more.",
  metadataBase: new URL("https://coursedock.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CourseDock — Learn Smarter. Build Faster.",
    description: "Discover thousands of carefully organized learning resources from multiple categories including Amazon, AI, Programming, Design, Marketing and more.",
    url: "https://coursedock.online",
    siteName: "CourseDock",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "CourseDock Educational Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourseDock — Learn Smarter. Build Faster.",
    description: "Discover thousands of carefully organized learning resources from multiple categories including Amazon, AI, Programming, Design, Marketing and more.",
    images: ["/images/og-image.webp"],
  },
};

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'system';
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

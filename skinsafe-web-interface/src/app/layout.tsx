
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SkinSafeAI - AI-Powered Dermatology for Precision Medicine",
  description: "Clinical decision support system powered by deep learning to assist dermatologists in detecting and classifying skin conditions with 96.3% accuracy",
  keywords: "dermatology, AI, skin analysis, medical technology, healthcare, skin cancer detection",
  authors: [{ name: "SkinSafeAI Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "SkinSafeAI - AI-Powered Dermatology",
    description: "Clinical decision support system powered by deep learning for skin condition detection",
    type: "website",
    locale: "en_US",
    siteName: "SkinSafeAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinSafeAI - AI-Powered Dermatology",
    description: "Clinical decision support system for skin condition detection",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body 
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-slate-50 to-blue-50`}
        suppressHydrationWarning={true}
      >
        {/* Global loading overlay - can be controlled by context */}
        <div id="global-loading" className="hidden fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Analyzing...</p>
          </div>
        </div>
        
        {/* Accessibility skip link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div className="relative min-h-screen">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse-scale"></div>
          </div>
          
          {/* Main content */}
          <main id="main-content" className="relative">
            <SessionProvider>{children}</SessionProvider>
          </main>
        </div>
        
  {/* Global scripts moved to ClientScripts component */}
      </body>
    </html>
  );
}
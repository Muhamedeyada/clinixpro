import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { IntlProvider } from "@/components/IntlProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ClinixPro",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased text-[var(--foreground)] transition-colors duration-300",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <IntlProvider>
            <div className="fixed top-4 ltr:right-4 rtl:left-4 z-50 flex items-center gap-2 p-1 bg-white/10 dark:bg-dark-500/50 backdrop-blur-md rounded-full border border-dark-500/30 shadow-lg">
              <ThemeToggle />
              <div className="w-[1px] h-4 bg-dark-500/50 mx-1" />
              <LanguageToggle />
            </div>
            {children}
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, useContext, useState, useEffect } from "react";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

type Locale = "en" | "ar";

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  toggleLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Locale | null;
    if (saved === "en" || saved === "ar") {
      setLocale(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("lang", locale);
  }, [locale, mounted]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "ar" : "en"));
  };

  const messages = locale === "ar" ? arMessages : enMessages;

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

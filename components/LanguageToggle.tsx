"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "./IntlProvider";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="px-4 font-medium text-dark-700 hover:text-white"
      aria-label="Toggle language"
    >
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}

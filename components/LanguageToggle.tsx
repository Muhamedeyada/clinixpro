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
      className="min-w-[44px] min-h-[44px] font-medium text-dark-700 hover:text-white"
      aria-label="Toggle language"
    >
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}

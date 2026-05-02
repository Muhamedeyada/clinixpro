"use client";

import { useTranslations } from "next-intl";

interface CopyrightProps {
  className?: string;
}

export function Copyright({ className }: CopyrightProps) {
  const t = useTranslations("common");
  return <p className={className ?? "copyright"}>{t("copyright")}</p>;
}

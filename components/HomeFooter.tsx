"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function HomeFooter() {
  const t = useTranslations("common");

  return (
    <div className="text-14-regular mt-20 flex justify-between">
      <p className="justify-items-end text-dark-600 xl:text-left">
        {t("copyright")}
      </p>
      <Link href="/?admin=true" className="text-green-500">
        {t("admin")}
      </Link>
    </div>
  );
}

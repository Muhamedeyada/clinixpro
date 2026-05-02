"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("loading");

  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={40}
        height={40}
        className="animate-spin"
      />
      {t("text")}
    </div>
  );
}

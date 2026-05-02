"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  icon: string;
  label?: string;
};

export const StatCard = ({ count = 0, icon, type, label }: StatCardProps) => {
  const t = useTranslations("statCard");
  const displayLabel = label ?? t(type);

  const accentColor = {
    appointments: "#24AE7C",
    pending: "#79B5EC",
    cancelled: "#FF4F4E",
  }[type];

  return (
    <div
      className="stat-card"
      style={{
        borderInlineStartColor: accentColor,
        borderInlineStartWidth: "4px",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center rounded-xl p-2"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Image
            src={icon}
            height={28}
            width={28}
            alt="stat icon"
            className="size-7 w-fit"
          />
        </div>
        <h2 className="text-32-bold text-foreground">{count}</h2>
      </div>

      <p className="text-14-regular text-[var(--muted-foreground)]">
        {displayLabel}
      </p>
    </div>
  );
};

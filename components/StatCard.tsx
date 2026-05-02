"use client";

import clsx from "clsx";
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

  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4 rtl:flex-row-reverse">
        <Image
          src={icon}
          height={32}
          width={32}
          alt="appointments"
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{displayLabel}</p>
    </div>
  );
};

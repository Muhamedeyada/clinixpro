"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";
import { useColumns } from "@/components/table/columns";
import { Appointment } from "@/types/appwrite.types";

interface AdminContentProps {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  appointments: Appointment[];
}

export function AdminContent({
  scheduledCount,
  pendingCount,
  cancelledCount,
  appointments,
}: AdminContentProps) {
  const t = useTranslations("adminDashboard");
  const columns = useColumns();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--dark-200)]">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer flex items-center">
          {/* Dark mode logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-6 md:h-8 w-fit hidden dark:block"
          />
          {/* Light mode logo */}
          <Image
            src="/assets/icons/logo-full-light.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-6 md:h-8 w-fit block dark:hidden"
          />
        </Link>
        <p className="text-14-semibold md:text-16-semibold text-foreground">{t("title")}</p>
      </header>

      <main className="admin-main mx-auto w-full max-w-7xl pt-10">
        <section className="w-full space-y-4">
          <h1 className="header">{t("welcome")}</h1>
          <p className="text-dark-700">{t("description")}</p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={scheduledCount}
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={pendingCount}
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={cancelledCount}
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        <DataTable columns={columns} data={appointments} />
      </main>
    </div>
  );
}

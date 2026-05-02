"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";

export function useColumns(): ColumnDef<Appointment>[] {
  const t = useTranslations("columns");

  return [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "patient",
      header: t("patient"),
      cell: ({ row }) => {
        const appointment = row.original;
        return <p className="text-14-medium">{appointment.patient.name}</p>;
      },
    },
    {
      accessorKey: "status",
      header: t("status"),
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="min-w-[115px]">
            <StatusBadge status={appointment.status} />
          </div>
        );
      },
    },
    {
      accessorKey: "schedule",
      header: t("appointment"),
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <p className="text-14-regular min-w-[100px]">
            {formatDateTime(appointment.schedule).dateTime}
          </p>
        );
      },
    },
    {
      accessorKey: "primaryPhysician",
      header: t("doctor"),
      cell: ({ row }) => {
        const appointment = row.original;

        const doctor = Doctors.find(
          (doctor) => doctor.name === appointment.primaryPhysician,
        );

        return (
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-8"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="pl-4">{t("actions")}</div>,
      cell: ({ row }) => {
        const appointment = row.original;

        return (
          <div className="flex gap-1">
            <AppointmentModal
              patientId={appointment.patient.$id}
              userId={appointment.userId}
              appointment={appointment}
              type="schedule"
              title=""
              description=""
            />
            <AppointmentModal
              patientId={appointment.patient.$id}
              userId={appointment.userId}
              appointment={appointment}
              type="cancel"
              title=""
              description=""
            />
          </div>
        );
      },
    },
  ];
}

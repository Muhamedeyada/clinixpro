"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface SuccessContentProps {
  userId: string;
  doctorImage: string;
  doctorName: string;
  appointmentDateTime: string;
}

export function SuccessContent({
  userId,
  doctorImage,
  doctorName,
  appointmentDateTime,
}: SuccessContentProps) {
  const t = useTranslations("success");
  const tCommon = useTranslations("common");

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            {t("heading")}{" "}
            <span className="text-green-500">{t("headingHighlight")}</span>
          </h2>
          <p>{t("message")}</p>
        </section>

        <section className="request-details">
          <p>{t("detailsHeading")}</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctorImage}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctorName}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{appointmentDateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            {t("newAppointment")}
          </Link>
        </Button>

        <p className="copyright">{tCommon("copyright")}</p>
      </div>
    </div>
  );
}

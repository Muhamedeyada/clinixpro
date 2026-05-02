import Image from "next/image";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { HomeFooter } from "@/components/HomeFooter";

const Home = async ({ searchParams }: SearchParamProps) => {
  const { admin } = await searchParams;
  const isAdmin = admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit hidden dark:block"
          />
          <Image
            src="/assets/icons/logo-full-light.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit block dark:hidden"
          />

          <PatientForm />

          <HomeFooter />
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img-v2.png"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden lg:block h-full max-w-[50%] object-cover"
      />
    </div>
  );
};

export default Home;

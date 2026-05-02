"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";

const idTypeKeyMap: Record<string, string> = {
  "Birth Certificate": "birthCertificate",
  "Driver's License": "driversLicense",
  "Medical Insurance Card/Policy": "medicalInsurance",
  "Military ID Card": "militaryId",
  "National Identity Card": "nationalId",
  Passport: "passport",
  "Resident Alien Card (Green Card)": "residentAlien",
  "Social Security Card": "socialSecurity",
  "State ID Card": "stateId",
  "Student ID Card": "studentId",
  "Voter ID Card": "voterId",
};

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const t = useTranslations("registerForm");
  const tGender = useTranslations("gender");
  const tIdTypes = useTranslations("identificationTypes");

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    const identificationFile =
      values.identificationDocument && values.identificationDocument.length > 0
        ? values.identificationDocument[0]
        : undefined;

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate).toISOString(),
        gender: values.gender.toLowerCase() as Gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        postMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: identificationFile,
        privacyConsent: values.privacyConsent,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient && !newPatient.error) {
        router.push(`/patients/${user.$id}/new-appointment`);
      } else {
        alert(newPatient?.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Registration Error:", error);
    }

    setIsLoading(false);
  };

  const onError = (errors: any) => {
    console.log("Form Validation Errors:", errors);
    if (!isMobile) return;
    const firstErrorField = Object.keys(errors)[0];
    const step1Fields = [
      "name",
      "email",
      "phone",
      "birthDate",
      "gender",
      "address",
      "occupation",
      "emergencyContactName",
      "emergencyContactNumber",
      "primaryPhysician",
      "insuranceProvider",
      "insurancePolicyNumber",
    ];
    if (step1Fields.includes(firstErrorField)) setStep(1);
    else setStep(2);
  };

  const personalInfo = (
    <section className="space-y-6">
      <div className="mb-9 space-y-1">
        <h2 className="sub-header">{t("personalInfo")}</h2>
      </div>

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label={t("nameLabel")}
        placeholder={t("namePlaceholder")}
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        required
      />

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          required
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label={t("phoneLabel")}
          placeholder={t("phonePlaceholder")}
          required
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label={t("birthDateLabel")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label={t("genderLabel")}
          required
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup
                className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {GenderOptions.map((option, i) => (
                  <div key={option + i} className="radio-group">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {tGender(option as "Male" | "Female")}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label={t("addressLabel")}
          placeholder={t("addressPlaceholder")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation"
          label={t("occupationLabel")}
          placeholder={t("occupationPlaceholder")}
          required
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="emergencyContactName"
          label={t("emergencyNameLabel")}
          placeholder={t("emergencyNamePlaceholder")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label={t("emergencyPhoneLabel")}
          placeholder={t("phonePlaceholder")}
          required
        />
      </div>
    </section>
  );

  const medicalInfo = (
    <section className="space-y-6 mt-12 md:mt-0">
      <div className="mb-9 space-y-1">
        <h2 className="sub-header">{t("medicalInfo")}</h2>
      </div>

      <CustomFormField
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="primaryPhysician"
        label={t("physicianLabel")}
        placeholder={t("physicianPlaceholder")}
        required
      >
        {Doctors.map((doctor, i) => (
          <SelectItem key={doctor.name + i} value={doctor.name}>
            <div className="flex cursor-pointer items-center gap-2">
              <Image
                src={doctor.image}
                width={32}
                height={32}
                alt="doctor"
                className="rounded-full border border-dark-500"
              />
              <p>{doctor.name}</p>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insuranceProvider"
          label={t("insuranceProviderLabel")}
          placeholder={t("insuranceProviderPlaceholder")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insurancePolicyNumber"
          label={t("insurancePolicyLabel")}
          placeholder={t("insurancePolicyPlaceholder")}
          required
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="allergies"
          label={t("allergiesLabel")}
          placeholder={t("allergiesPlaceholder")}
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label={t("medicationsLabel")}
          placeholder={t("medicationsPlaceholder")}
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="familyMedicalHistory"
          label={t("familyHistoryLabel")}
          placeholder={t("familyHistoryPlaceholder")}
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="pastMedicalHistory"
          label={t("pastHistoryLabel")}
          placeholder={t("pastHistoryPlaceholder")}
        />
      </div>
    </section>
  );

  const idAndConsent = (
    <>
      <section className="space-y-6">
        <div className="mb-9 space-y-1">
          <h2 className="sub-header">{t("identificationSection")}</h2>
        </div>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label={t("identificationTypeLabel")}
          placeholder={t("identificationTypePlaceholder")}
          required
        >
          {IdentificationTypes.map((type, i) => (
            <SelectItem key={type + i} value={type}>
              {tIdTypes((idTypeKeyMap[type] ?? "birthCertificate") as any)}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label={t("identificationNumberLabel")}
          placeholder={t("identificationNumberPlaceholder")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label={t("identificationDocLabel")}
          required
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
      </section>

      <section className="space-y-6 mt-12">
        <div className="mb-9 space-y-1">
          <h2 className="sub-header">{t("consentSection")}</h2>
        </div>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label={t("treatmentConsentLabel")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label={t("disclosureConsentLabel")}
          required
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label={t("privacyConsentLabel")}
          required
        />
      </section>
    </>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex-1 space-y-12 pb-20"
      >
        <section className="space-y-4">
          <h1 className="header">{t("title")}</h1>
          <p className="text-dark-700">{t("subtitle")}</p>
        </section>

        {!isMobile ? (
          <>
            {personalInfo}
            {medicalInfo}
            {idAndConsent}
            <SubmitButton isLoading={isLoading}>{t("submit")}</SubmitButton>
          </>
        ) : (
          <>
            {step === 1 && (
              <>
                {personalInfo}
                {medicalInfo}
              </>
            )}
            {step === 2 && idAndConsent}

            <div className="flex flex-col gap-4 md:flex-row mt-12">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="shad-gray-btn h-11 w-full rounded-md md:w-32"
                >
                  {t("back")}
                </button>
              )}

              {step === 1 ? (
                <button
                  type="button"
                  onClick={async () => {
                    const fields = [
                      "name",
                      "email",
                      "phone",
                      "birthDate",
                      "gender",
                      "address",
                      "occupation",
                      "emergencyContactName",
                      "emergencyContactNumber",
                      "primaryPhysician",
                      "insuranceProvider",
                      "insurancePolicyNumber",
                    ];
                    const isValid = await form.trigger(fields as any);
                    if (isValid) setStep(2);
                  }}
                  className="shad-primary-btn h-11 w-full rounded-md md:flex-1"
                >
                  {t("next")}
                </button>
              ) : (
                <SubmitButton isLoading={isLoading} className="flex-1">
                  {t("submit")}
                </SubmitButton>
              )}
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default RegisterForm;

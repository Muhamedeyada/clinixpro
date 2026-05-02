export const GenderOptions = ["Male", "Female"];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green-v2.png",
    name: "Ahmed Nasser",
  },
  {
    image: "/assets/images/dr-cameron-v2.png",
    name: "Leila Nasser",
  },
  {
    image: "/assets/images/dr-livingston-v2.png",
    name: "Mohamed Ahmed",
  },
  {
    image: "/assets/images/dr-peter-v2.png",
    name: "Nada Mohamed",
  },
  {
    image: "/assets/images/dr-powell-v2.png",
    name: "Nasser Ahmed",
  },
  {
    image: "/assets/images/dr-remirez-v2.png",
    name: "Mahmoud Hassan",
  },
  {
    image: "/assets/images/dr-lee-v2.png",
    name: "Jasmine Mahmoud",
  },
  {
    image: "/assets/images/dr-cruz-v2.png",
    name: "Leila Ahmed",
  },
  {
    image: "/assets/images/dr-sharma-v2.png",
    name: "Ahmed Shams",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

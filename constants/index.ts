export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
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
  "Certificado de Nacimiento",
  "Licencia de Conducir",
  "Tarjeta de Asegurado",
  "Carnet Militar",
  "DNI",
  "Pasaporte",
  "EsSalud",
  "Identificación Estatal",
  "Carnet Universitario",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Juan Perez",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Julia Ulloa",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Martinez",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Ivan Garcia",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Maria Lopez",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jorge Sanchez",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alicia Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Mario Moreno",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
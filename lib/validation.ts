import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(6, "Nombre debe tener mínimo 6 caracteres")
    .max(50, "Nombre debe tener máximo 50 caracteres"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(6, "Nombre debe tener mínimo 6 caracteres")
    .max(50, "Nombre debe tener máximo 50 caracteres"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número inválido"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(8, "Dirección debe tener mínimo 8 caracteres")
    .max(500, "Dirección debe tener máximo 500 caracteres"),
  occupation: z
    .string()
    .min(6, "Ocupación debe tener mínimo 6 caracteres")
    .max(500, "Ocupación debe tener máximo 500 caracteres"),
  emergencyContactName: z
    .string()
    .min(6, "Nombre de contacto debe tener mínimo 6 caracteres")
    .max(50, "Nombre de contacto debe tener máximo 50 caracteres"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Número inválido"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Nombre de aseguradora debe tener mínimo 2 caracteres")
    .max(50, "Nombre de aseguradora debe tener máximo 50 caracteres"),
  insurancePolicyNumber: z
    .string()
    .min(6, "Número de poliza debe tener mínimo 6 caracteres")
    .max(50, "Número de poliza debe tener máximo 50 caracteres"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debes aceptar para continuar",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debes aceptar para continuar",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debes aceptar para continuar",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(6, "Reason must be at least 6 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
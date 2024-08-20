"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { RadioGroupItem } from "@radix-ui/react-radio-group"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

 
const RegisterForm = ({ user }: { user: User}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone:""
    },
  })
 
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if(values.identificationDocument && values.identificationDocument.length > 0) {
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })

        formData = new FormData();
        formData.append('blobFile', blobFile);
        formData.append('fileName', values.identificationDocument[0].name)
    }

    try {
        const patientData = {
            ...values,
            userId: user.$id,
            birthDate: new Date(values.birthDate),
            identificationDocument: formData,
        }

        //@ts-ignore
        const patient = await registerPatient(patientData);
        if(patient) router.push(`/patients/${user.$id}/new-appointment`)
    }   catch (error) {
        console.log(error);
    }

    setIsLoading(false)
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Bienvenido! 👋🏼</h1>
            <p className="text-dark-700">Cuéntanos un poco sobre ti.</p>
        </section>
        <section className="space-y-6"> 
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Información Personal</h2>
            </div>
        </section>
        
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Nombre Completo"
            placeholder="Jorge Osorio"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Correo Electrónico"
                placeholder="jorgeosorio@gmail.com"
            />

            <CustomFormField 
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Número de Teléfono"
                placeholder="+51 912 345 678"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Fecha de Nacimiento"
                placeholder="Fecha de Nacimiento"
            />

            <CustomFormField 
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="gender"
                label="Género"
                placeholder="Género"
            >
                {GenderOptions.map((type) =>(
                    <SelectItem key={type} value={type}>
                        {type}
                    </SelectItem>
                ))}
            </CustomFormField>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Dirección"
                placeholder="Av. Javier Prado Este 100, San Isidro"
            />
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Ocupación"
                placeholder="Administrador"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Contacto de Emergencia"
                placeholder="Nombre de Contacto"
            />
            <CustomFormField 
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Número de Contacto de Emergencia"
                placeholder="Administrador"
            />
        </div>

        <section className="space-y-6"> 
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Información Médica</h2>
            </div>
        </section>
        
        <CustomFormField 
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor Primario"
            placeholder="Selecciona un doctor"
        >
            {Doctors.map((doctor) =>(
                <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                            src={doctor.image}
                            width={32}
                            height={32}
                            alt={doctor.name}
                            className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                    </div>
                </SelectItem>
            ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Aseguradora"
                placeholder="Tu Aseguradora"
            />
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Número de Póliza"
                placeholder="A12345678"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                label="Alergias"
                placeholder="Coméntanos si sufres de alergia a algo"
            />
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label="Medicamentos Actuales"
                placeholder="Ibuprofeno 100mg, Paracetamol 200mg, Cetirizina 10mg"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label="Historia Médica Familiar"
                placeholder="Padre y abuelo diabético"
            />
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Historial Médico"
                placeholder="Fracturas, Rhinitis crónica"
            />
        </div>
        
        <section className="space-y-6"> 
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificación y Verificación</h2>
            </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Tipo de Identificación"
            placeholder="Elige tu tipo de identificación"
        >
            {IdentificationTypes.map((type) =>(
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Número de identificación"
            placeholder="Ej: 01234567"
        />

        <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Copia digital de su documento"
            placeholder="Ej: 01234567"
            renderSkeleton={(field) => (
                <FormControl>
                    <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
            )}
        />

        <section className="space-y-6"> 
            <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimiento y Privacidad</h2>
            </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="Doy mi consentimiento para ser tratado"
        />
        <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Doy mi consentimiento para compartir mi información"
        />
        <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Acepto las políticas de privacidad"
        />

        <SubmitButton isLoading={isLoading}>Comencémos</SubmitButton>
      </form>
    </Form>
    )
}

export default RegisterForm
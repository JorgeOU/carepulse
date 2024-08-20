'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "./appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointment
        )

        return parseStringify(newAppointment);
    } catch (error) {
        
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
        )
        return parseStringify(appointment)
    } catch (error) {
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCount = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled'){
                acc.scheduledCount += 1;
            } else if (appointment.status === 'pending'){
                acc.pendingCount += 1;
            } else if (appointment.status === 'cancelled'){
                acc.cancelledCount += 1;
            }

            return acc;
        }, initialCount);

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents
        }
        return parseStringify(data)
    } catch (error) {
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type } : UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        if(!updatedAppointment) {
            throw new Error('Cita no encontrada');
        }

        const smsMessage = `
            Hola! Somos Carepulse,${type === 'schedule' ? `tu cita ha sido programada para la siguiente fecha: ${formatDateTime(appointment.schedule!).dateTime} con Dr. ${appointment.primaryPhysician}` : `lamentamos informarte que tu cita ha sido cancelada por el siguiente motivo: ${appointment.cancellationReason}`
            }
        `
        await sendSMSNotification(userId, smsMessage);
        revalidatePath('/admin');

        return parseStringify(updatedAppointment)
    } catch (error) {
        
    }
}

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        )

        return parseStringify(message)
    } catch (error) {
        console.log(error)
    }
}
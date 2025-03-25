import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const contactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
});

const prisma = new PrismaClient();



dotenv.config();

async function sendEmail(name: string, email: string, subject: string, message: string) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: "mondalrohan201@gmail.com",
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}

export async function sendContactForm(formData: z.infer<typeof contactFormSchema>) {
    const validatedData = contactFormSchema.parse(formData);

    try {
        const message = await prisma.contactMessage.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                subject: validatedData.subject,
                message: validatedData.message,
            },
        });
        await sendEmail(validatedData.name, validatedData.email, validatedData.subject, validatedData.message);

        return { success: true, id: message.id };
    } catch (error) {
        console.error("Error saving contact message", error);
        throw new Error("Failed to send message");
    } finally {
        await prisma.$disconnect();
    }
}

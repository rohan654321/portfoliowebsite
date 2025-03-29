import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  try {
    const formData = await req.json()
    console.log("Received form data:", formData)

    const validatedData = contactFormSchema.parse(formData)
    console.log("Validated data:", validatedData)

    // Save to database
    await prisma.contactMessage.create({
      data: validatedData,
    })

    // Check if email credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are missing.")
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"${validatedData.name}" <${process.env.EMAIL_USER}>`,
      to: "mondalrohan201@gmail.com",
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      text: `Message from ${validatedData.name} (${validatedData.email}):\n\n${validatedData.message}`,
    })

    console.log("Email sent successfully!")
    return NextResponse.json({ success: true, message: "Thank You for message. We will get back to you soon!" })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send message" },
      { status: 500 },
    )
  }
}


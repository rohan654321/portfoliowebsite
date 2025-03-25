import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Save message to database
    await prisma.contactMessage.create({ data: { name, email, subject, message } });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use your Gmail address
        pass: process.env.EMAIL_PASS, // Use App Password (not your Gmail password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "mondalrohan201@gmail.com",
      subject: `New Contact Message: ${subject}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}

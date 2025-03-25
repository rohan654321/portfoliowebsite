"use server";

export async function sendContactForm(data: { name: string; email: string; subject: string; message: string }) {
  try {
    console.log("Form Submitted:", data);
    return { success: true, message: "Message sent successfully!" };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, message: "Error sending message" };
  }
}

// /utils/emailClient.ts
import emailjs from "@emailjs/browser";

interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Sends an email to admin using EmailJS
 * Template should use {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 */
export const sendEmailToAdmin = async (data: EmailData) => {
    try {
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            website_link: "https://ancart.vercel.app",
            logo_url: "https://res.cloudinary.com/ddpltmgww/image/upload/v1770202998/ancart_logo_ucryzn.png",
        };

        const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        return result;
    } catch (error) {
        console.error("Email sending error:", error);
        throw error;
    }
};

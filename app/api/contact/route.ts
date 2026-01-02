import { NextRequest, NextResponse } from "next/server";
import { ContactEmailTemplate } from "@/app/components/contact-email-template";
import { Resend } from "resend";
import { arcjetConfig } from "@/lib/arcjet";
import { getClientIP } from "@/lib/utils";
import { companyEmails } from "@/lib/constants";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const decision = await arcjetConfig.protect(request, {
      ip: clientIP,
      requested: 4, // Deduct 4 tokens for contact form submission (3 company emails + 1 user email)
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        {
          message: `Too many contact form submissions. Please try again tomorrow.`,
          reason: decision.reason,
          remainingTime: 86400, // 1day
        },
        { status: 429 }
      );
    }

    const body: ContactRequest = await request.json();
    const { name, email, company, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Validate email format
    if (!email.includes("@")) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    // Check if Resend API key is configured
    if (!env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ message: "Email service not configured" }, { status: 500 });
    }

    // Send email to the company
    for (const companyEmail of companyEmails) {
      try {
        const { data, error } = await resend.emails.send({
          from: "Adwait Artha <contact@adwaitartha.com>",
          to: [companyEmail],
          subject: `New Contact Inquiry - ${service} - ${name}`,
          react: ContactEmailTemplate({
            name,
            email,
            company,
            phone,
            service,
            message,
            emailType: "company",
          }),
        });

        if (error) {
          console.error(`Failed to send company email to ${companyEmail}:`, error);
        } else {
          console.log(`Company email sent successfully to ${companyEmail}:`, data);
        }

        // Add delay between emails to respect Resend's rate limit (2 requests per second)
        await new Promise((resolve) => setTimeout(resolve, 600)); // 600ms delay = ~1.67 requests per second
      } catch (error) {
        console.error(`Error sending company email to ${companyEmail}:`, error);
      }
    }

    // Add delay before sending user email to respect Resend's rate limit
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Send confirmation email to the user
    try {
      const { data, error } = await resend.emails.send({
        from: "Adwait Artha LLP <contact@adwaitartha.com>",
        to: [email],
        subject: "Inquiry Received - Adwait Artha LLP",
        react: ContactEmailTemplate({
          name,
          email,
          company,
          phone,
          service,
          message,
          emailType: "user",
        }),
      });

      if (error) {
        console.error("Failed to send user confirmation email:", error);
      } else {
        console.log("User email sent successfully:", data);
      }
    } catch (error) {
      console.error("Error sending user email:", error);
    }

    return NextResponse.json({ message: "Inquiry submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

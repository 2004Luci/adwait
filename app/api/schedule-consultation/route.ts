import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import { EmailTemplate } from '@/app/components/email-template';
import { Resend } from 'resend';
import { arcjetConfig, getClientIP } from '../arcjet/route';
import { companyEmails } from '@/lib/constants';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ScheduleRequest {
  date: string;
  time: string;
  email: string;
  name: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const decision = await arcjetConfig.protect(request, { 
      ip: clientIP,
      requested: 4 // Deduct 4 tokens for scheduling consultation (3 company emails + 1 user email)
    });

    if (decision.isDenied()) {
      return NextResponse.json(
        { 
          message: `Too many scheduling attempts. Please try again later.`,
          reason: decision.reason,
          remainingTime: 300 // Scheduling rate limit is 5 minutes (allows ~2 submissions per 5 minutes)
        },
        { status: 429 }
      );
    }

    const body: ScheduleRequest = await request.json();
    const { date, time, email, name, phone } = body;

    // Validate input
    if (!date || !time || !email || !name || !phone) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (phone.length < 10) {
      return NextResponse.json(
        { message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const now = new Date();

    // Validate date is in the future
    if (selectedDate <= now) {
      return NextResponse.json(
        { message: 'Selected date must be in the future' },
        { status: 400 }
      );
    }

    // Format the date for display
    const formattedDate = format(selectedDate, 'EEEE, MMMM do, yyyy');
    const formattedTime = time;

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send emails to the team    
    for (const companyEmail of companyEmails) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Adwait Artha <contact@adwaitartha.com>',
          to: [companyEmail],
          subject: 'New Consultation Booking - Adwait Artha LLP',
          react: EmailTemplate({
            consultationDate: formattedDate,
            consultationTime: formattedTime,
            emailType: 'team',
            clientEmail: email,
            clientName: name,
            clientPhone: phone,
          }),
        });

        if (error) {
          console.error(`Failed to send team email to ${companyEmail}:`, error);
        } else {
          console.log(`Team email sent successfully to ${companyEmail}:`, data);
        }
        
        // Add delay between emails to respect Resend's rate limit (2 requests per second)
        await new Promise(resolve => setTimeout(resolve, 600)); // 600ms delay = ~1.67 requests per second
      } catch (error) {
        console.error(`Error sending team email to ${companyEmail}:`, error);
      }
    }

    // Add delay before sending client email to respect Resend's rate limit
    await new Promise(resolve => setTimeout(resolve, 600));

    // Send confirmation email to the client
    try {
      const { data, error } = await resend.emails.send({
        from: 'Adwait Artha LLP <contact@adwaitartha.com>',
        to: [email],
        subject: 'Consultation Confirmed - Adwait Artha LLP',
        react: EmailTemplate({
          consultationDate: formattedDate,
          consultationTime: formattedTime,
          emailType: 'client',
          clientName: name,
          clientPhone: phone,
        }),
      });

      if (error) {
        console.error('Failed to send client confirmation email:', error);
      } else {
        console.log('Client email sent successfully:', data);
      }
    } catch (error) {
      console.error('Error sending client email:', error);
    }

    return NextResponse.json(
      { message: 'Consultation scheduled successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error scheduling consultation:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import { EmailTemplate } from '@/app/components/email-template';
import { Resend } from 'resend';

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
    const teamEmails = ['mit4s.dev@gmail.com'];
    
    for (const teamEmail of teamEmails) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [teamEmail],
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
          console.error(`Failed to send team email to ${teamEmail}:`, error);
        } else {
          console.log(`Team email sent successfully to ${teamEmail}:`, data);
        }
      } catch (error) {
        console.error(`Error sending team email to ${teamEmail}:`, error);
      }
    }

    // Send confirmation email to the client
    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
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
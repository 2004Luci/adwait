import { companyEmails } from '../../lib/constants';

interface EmailTemplateProps {
  clientName?: string;
  consultationDate: string;
  consultationTime: string;
  emailType: 'client' | 'team';
  clientEmail?: string;
  clientPhone?: string;
}

export function EmailTemplate({ 
  clientName = 'Valued Client',
  consultationDate, 
  consultationTime, 
  emailType,
  clientEmail,
  clientPhone
}: EmailTemplateProps) {
  if (emailType === 'client') {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', 
          color: 'white', 
          padding: '30px', 
          textAlign: 'center',
          borderRadius: '10px 10px 0 0'
        }}>
          <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>Consultation Confirmed</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>Adwait Artha LLP</p>
        </div>
        <div style={{ 
          background: '#f7fafc', 
          padding: '30px',
          border: '1px solid #e2e8f0',
          borderTop: 'none'
        }}>
          <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Thank you for scheduling your consultation, {clientName}!</h2>      
          <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '20px' }}>
            We're excited to discuss your financial advisory needs and explore how we can support your business growth.
          </p>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            margin: '20px 0', 
            borderLeft: '4px solid #4a5568',
            borderRadius: '5px'
          }}>
            <h3 style={{ color: '#2d3748', margin: '0 0 15px 0' }}>Your Consultation Details:</h3>
            <div style={{ color: '#4a5568', lineHeight: '1.8' }}>
              <p style={{ margin: '5px 0' }}><strong>Name:</strong> {clientName}</p>
              <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {clientPhone}</p>
              <p style={{ margin: '5px 0' }}><strong>Date:</strong> {consultationDate}</p>
              <p style={{ margin: '5px 0' }}><strong>Time:</strong> {consultationTime}</p>
              <p style={{ margin: '5px 0' }}><strong>Type:</strong> Introductory Consultation Call</p>
            </div>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', 
            color: 'white', 
            padding: '20px', 
            margin: '20px 0',
            borderRadius: '5px'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>What to Expect</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>
              During this call, we'll discuss your specific needs, explore potential solutions, and outline how our services can benefit your business.
            </p>
          </div>
          <div style={{ margin: '20px 0' }}>
            <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>Important Notes:</h4>
            <ul style={{ color: '#4a5568', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>Please be ready 5 minutes before the scheduled time</li>
              <li>We'll call you at {clientPhone} for the consultation</li>
              <li>Feel free to prepare any questions you may have</li>
              <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
            </ul>
          </div>
          <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
            If you have any questions before the consultation, please don't hesitate to reach out to us.
          </p>
        </div>
        <div style={{ 
          background: '#2d3748', 
          color: 'white', 
          padding: '20px', 
          textAlign: 'center',
          borderRadius: '0 0 10px 10px',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}><strong>Adwait Artha LLP</strong></p>
          <p style={{ margin: '0 0 5px 0' }}>Financial Advisory Services</p>
          <p style={{ margin: '0', opacity: '0.8' }}>
            Contact: {companyEmails[1] ?? ''} | {companyEmails[2] ?? ''}
          </p>
        </div>
      </div>
    );
  }

  // Team notification email
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', 
        color: 'white', 
        padding: '30px', 
        textAlign: 'center',
        borderRadius: '10px 10px 0 0'
      }}>
        <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>New Consultation Booking</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>Adwait Artha LLP</p>
      </div>
      <div style={{ 
        background: '#f7fafc', 
        padding: '30px',
        border: '1px solid #e2e8f0',
        borderTop: 'none'
      }}>
        <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>A new consultation has been scheduled</h2>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          margin: '20px 0', 
          borderLeft: '4px solid #4a5568',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: '#2d3748', margin: '0 0 15px 0' }}>Consultation Details:</h3>
          <div style={{ color: '#4a5568', lineHeight: '1.8' }}>
            <p style={{ margin: '5px 0' }}><strong>Client Name:</strong> {clientName}</p>
            <p style={{ margin: '5px 0' }}><strong>Client Phone:</strong> {clientPhone}</p>
            <p style={{ margin: '5px 0' }}><strong>Client Email:</strong> {clientEmail}</p>
            <p style={{ margin: '5px 0' }}><strong>Date:</strong> {consultationDate}</p>
            <p style={{ margin: '5px 0' }}><strong>Time:</strong> {consultationTime}</p>
            <p style={{ margin: '5px 0' }}><strong>Type:</strong> Introductory Consultation Call</p>
          </div>
        </div>
        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
          Please prepare for this consultation and ensure you have all necessary materials ready. 
          You can call the client at {clientPhone} for the consultation.
        </p>
      </div>
      <div style={{ 
        background: '#2d3748', 
        color: 'white', 
        padding: '20px', 
        textAlign: 'center',
        borderRadius: '0 0 10px 10px',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0', opacity: '0.8' }}>
          This is an automated notification from Adwait Artha LLP
        </p>
      </div>
    </div>
  );
}
import { contactEmail, contactPhone } from '../../lib/constants';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  emailType: 'company' | 'user';
}

export function ContactEmailTemplate({ 
  name,
  email,
  company,
  phone,
  service,
  message,
  emailType
}: ContactEmailTemplateProps) {
  if (emailType === 'user') {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', 
          color: 'white', 
          padding: '30px', 
          textAlign: 'center',
          borderRadius: '10px 10px 0 0'
        }}>
          <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>Inquiry Received</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>Adwait Artha LLP</p>
        </div>
        <div style={{ 
          background: '#f7fafc', 
          padding: '30px',
          border: '1px solid #e2e8f0',
          borderTop: 'none'
        }}>
          <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Thank you for your inquiry, {name}!</h2>
          <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '20px' }}>
            We have received your inquiry and our expert team will review it carefully. We'll get back to you within 24 hours with a detailed response.
          </p>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            margin: '20px 0', 
            borderLeft: '4px solid #4a5568',
            borderRadius: '5px'
          }}>
            <h3 style={{ color: '#2d3748', margin: '0 0 15px 0' }}>Your Inquiry Details:</h3>
            <div style={{ color: '#4a5568', lineHeight: '1.8' }}>
              <p style={{ margin: '5px 0' }}><strong>Name:</strong> {name}</p>
              <p style={{ margin: '5px 0' }}><strong>Email:</strong> {email}</p>
              {company && <p style={{ margin: '5px 0' }}><strong>Company:</strong> {company}</p>}
              {phone && <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {phone}</p>}
              <p style={{ margin: '5px 0' }}><strong>Service Required:</strong> {service}</p>
              <p style={{ margin: '5px 0' }}><strong>Message:</strong></p>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                margin: '10px 0', 
                borderRadius: '5px',
                border: '1px solid #e9ecef'
              }}>
                {message}
              </div>
            </div>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', 
            color: 'white', 
            padding: '20px', 
            margin: '20px 0',
            borderRadius: '5px'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>What Happens Next</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', opacity: '0.9' }}>
              <li>Our expert team will review your inquiry within 24 hours</li>
              <li>We'll provide a detailed response with relevant solutions</li>
              <li>If needed, we'll schedule a consultation call</li>
              <li>You'll receive personalized recommendations for your needs</li>
            </ul>
          </div>
          <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
            If you have any urgent questions, please don't hesitate to contact us directly at +91 7940305119.
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
            Contact: {contactEmail} | {contactPhone}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)', 
        color: 'white', 
        padding: '30px', 
        textAlign: 'center',
        borderRadius: '10px 10px 0 0'
      }}>
        <h1 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>New Contact Inquiry</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '16px', opacity: '0.9' }}>Adwait Artha LLP</p>
      </div>
      <div style={{ 
        background: '#f7fafc', 
        padding: '30px',
        border: '1px solid #e2e8f0',
        borderTop: 'none'
      }}>
        <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>A new inquiry has been submitted</h2>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          margin: '20px 0', 
          borderLeft: '4px solid #4a5568',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: '#2d3748', margin: '0 0 15px 0' }}>Inquiry Details:</h3>
          <div style={{ color: '#4a5568', lineHeight: '1.8' }}>
            <p style={{ margin: '5px 0' }}><strong>Name:</strong> {name}</p>
            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {email}</p>
            {company && <p style={{ margin: '5px 0' }}><strong>Company:</strong> {company}</p>}
            {phone && <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {phone}</p>}
            <p style={{ margin: '5px 0' }}><strong>Service Required:</strong> {service}</p>
            <p style={{ margin: '5px 0' }}><strong>Message:</strong></p>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              margin: '10px 0', 
              borderRadius: '5px',
              border: '1px solid #e9ecef'
            }}>
              {message}
            </div>
          </div>
        </div>
        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
          Please review this inquiry and respond to the client within 24 hours. You can contact them at {email} or {phone ? phone : 'the provided email'}.
        </p>
        <div style={{ 
          background: '#e6fffa', 
          padding: '15px', 
          margin: '20px 0', 
          borderRadius: '5px',
          border: '1px solid #81e6d9'
        }}>
          <p style={{ margin: '0', color: '#2c7a7b', fontWeight: 'bold' }}>
            ⚡ Action Required: Please respond to this inquiry within 24 hours
          </p>
        </div>
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
          This is an automated notification from Adwait Artha LLP Contact Form
        </p>
      </div>
    </div>
  );
}

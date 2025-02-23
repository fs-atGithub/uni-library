import React from 'react';

const WelcomeEmail = ({ fullName }: { fullName: string }) => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <h1 style={{ color: '#007bff' }}>Welcome to Zaprojekte, {fullName}!</h1>
      <p>
        We're thrilled to have you on board. Zaprojekte is your gateway to
        innovative solutions and seamless project execution.
      </p>
      <p>
        To get started, explore your dashboard, connect with our community, and
        bring your ideas to life.
      </p>
      <p>
        If you have any questions, feel free to reach out to us at
        <a
          href="mailto:info@zaprojekte.com"
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          {' '}
          info@zaprojekte.com
        </a>
        .
      </p>
      <p>Welcome aboard, and let's create something amazing together!</p>
      <p>Best regards,</p>
      <p>
        <strong>The Zaprojekte Team</strong>
      </p>
    </div>
  );
};

export default WelcomeEmail;

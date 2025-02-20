import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Resend } from 'resend';

import WelcomeEmail from '@/components/emails/WelcomeEmail';
import config from '@/lib/config';

// Remove unused imports and variables
// import { Client as QStashClient } from '@upstash/qstash';
// import { Client as WorkflowClient } from '@upstash/workflow';

// Remove unused qstashClient
// const qstashClient = new QStashClient({
//   token: config.env.upstash.qstashToken,
// });

// Initialize Resend client
const resendClient = new Resend(config.env.resendToken);

export const sendEmail = async ({
  email,
  subject,
  message,
  fullName,
}: {
  email: string;
  subject: string;
  message: string;
  fullName: string;
}) => {
  // Fix incorrect usage of WelcomeEmail by ensuring it’s passed as a JSX element
  const emailHtml = ReactDOMServer.renderToString(
    React.createElement(WelcomeEmail, { fullName, message }) // Correct way
  );

  await resendClient.emails.send({
    from: 'Filip <info@zaprojekte.com>',
    to: [email],
    subject,
    html: emailHtml, // Use the generated HTML string
  });
};

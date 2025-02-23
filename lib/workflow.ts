import { Client as QStashClient } from '@upstash/qstash';
import { Client as WorkflowClient } from '@upstash/workflow';
import { Resend } from 'resend';

import config from '@/lib/config';
import WelcomeEmail from '@/components/emails/WelcomeEmail';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});
new QStashClient({
  token: config.env.upstash.qstashToken,
});
const resend = new Resend(config.env.resendToken);

export const sendEmail = async ({
  email,
  subject,
  fullName,
  message,
}: {
  email: string;
  subject: string;
  fullName: string;
  message: string;
}) => {
  try {
    console.log('Preparing to send email...');

    // Ensure WelcomeEmail is a valid React component
    const emailContent = WelcomeEmail({ fullName, message });

    const response = await resend.emails.send({
      from: 'Filip <info@zaprojekte.com>',
      to: [email],
      subject,
      react: emailContent,
    });

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
};

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
}: {
  email: string;
  subject: string;
  fullName: string;
  message: string;
}) => {
  // Ensure WelcomeEmail is a valid React component

  const emailContent = WelcomeEmail({ fullName });
  return await resend.emails.send({
    from: 'Filip <info@zaprojekte.com>',
    to: [email],
    subject,
    react: emailContent,
  });
};

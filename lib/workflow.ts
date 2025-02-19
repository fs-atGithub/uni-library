import { Client as QStashClient } from '@upstash/qstash';
import { Client as WorkflowClient } from '@upstash/workflow';
import { Resend } from 'resend';

import WelcomeEmail from '@/components/emails/WelcomeEmail';
import config from '@/lib/config';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
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
}) => {
  await resend.emails.send({
    from: 'Filip <info@zaprojekte.com>',
    to: email,
    subject,
    react: WelcomeEmail({ fullName }), // Send a styled React email
  });
};

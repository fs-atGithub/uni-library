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
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: 'email',
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: 'Filip <info@zaprojekte.com>',
      to: [email],
      subject,
      react: WelcomeEmail({ subject, message }), // Using React Email component
    },
  });
};

import { Client as QStashClient, resend } from '@upstash/qstash';
import { Client as WorkflowClient } from '@upstash/workflow';

import config from '@/lib/config';
import WelcomeEmail from '@/components/emails/WelcomeEmail';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

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
  await qstashClient.publishJSON({
    api: {
      name: 'email',
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: 'Filip <info@zaprojekte.com>',
      to: [email],
      subject,
      react: WelcomeEmail({ fullName, message }),
    },
  });
};

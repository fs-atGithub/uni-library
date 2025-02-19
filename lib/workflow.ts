import { Client as QStashClient, resend } from '@upstash/qstash';
import { Client as WorkflowClient } from '@upstash/workflow';

import config from '@/lib/config';

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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
          <h2 style="color: #333;">${subject}</h2>
          <p style="color: #555;">${message}</p>
          <a href="https://zaprojekte.com" target="_blank" 
             style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">
            Visit our website
          </a>
        </div>
      `,
    },
  });
};

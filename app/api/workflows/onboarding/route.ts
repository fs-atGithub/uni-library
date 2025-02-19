import { serve } from '@upstash/workflow/nextjs';
import { eq } from 'drizzle-orm';

import Welcome from '@/app/emails/Welcome'; // Import the Welcome component
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { sendEmail } from '@/lib/workflow';

type userState = 'non-active' | 'active';

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<userState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return 'non-active';

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();
  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return 'non-active';
  }
  return 'active';
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  //Welcome email - Using the imported Welcome component
  await context.run('new-signup', async () => {
    // Render the Welcome component to a string.  You'll likely need to adapt your Welcome component to be renderable to a string.
    const welcomeMessage = Welcome({ fullName }); // Assuming Welcome is a function component that accepts fullName.

    await sendEmail({
      email,
      subject: 'Welcome to the platform',
      message: welcomeMessage, // Use the rendered component output as the message
    });
  });

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email);
    });

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'Are you still there',
          message: `Hey we miss you ${fullName} `,
        });
      });
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: 'Welcome back',
          message: `It's good to see you active ${fullName} `, // Corrected typo here
        });
      });
    }

    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30);
  }
});

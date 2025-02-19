import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import type * as React from 'react';

interface WelcomeProps {
  fullName?: string;
  type?: 'welcome' | 'reminder' | 'reengagement';
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  links?: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
  ? `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}`
  : '';

const PropDefaults: WelcomeProps = {
  type: 'welcome',
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Deploy your first project.</strong>{' '}
          <Link>Connect to Git, choose a template</Link>, or manually deploy a
          project you've been working on locally.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Check your deploy logs.</strong> Find out what's included in
          your build and watch for errors or failed deploys.{' '}
          <Link>Learn how to read your deploy logs</Link>.
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Choose an integration.</strong> Quickly discover, connect, and
          configure the right tools for your project with 150+ integrations to
          choose from. <Link>Explore the Integrations Hub</Link>.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={4}>
          <strong>Set up a custom domain.</strong> You can register a new domain
          and buy it through Netlify or assign a domain you already own to your
          site. <Link>Add a custom domain</Link>.
        </li>
      ),
    },
  ],
  links: ['Visit the forums', 'Read the docs', 'Contact an expert'],
};

export const Welcome = ({
  fullName = '',
  type = 'welcome',
  steps = PropDefaults.steps,
  links = PropDefaults.links,
}: WelcomeProps) => {
  const getMessage = () => {
    switch (type) {
      case 'welcome':
        return {
          title: `Welcome to Netlify, ${fullName}!`,
          subtitle:
            "You're joining millions of developers building and shipping fast, scalable applications.",
          buttonText: 'Go to your dashboard',
        };
      case 'reminder':
        return {
          title: `Hey ${fullName}, we miss you!`,
          subtitle:
            "It has been a while since we last saw you. Come back and check out what's new!",
          buttonText: 'Check your account',
        };
      case 'reengagement':
        return {
          title: `Welcome back, ${fullName}!`,
          subtitle:
            'We’re thrilled to see you active again. Let’s build something great together!',
          buttonText: 'Continue where you left off',
        };
      default:
        return {
          title: 'Welcome!',
          subtitle: 'Glad to have you here.',
          buttonText: 'Explore now',
        };
    }
  };

  const { title, subtitle, buttonText } = getMessage();

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#2250f4',
                offwhite: '#fafbfb',
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Preview>{title}</Preview>
        <Body className="bg-offwhite font-sans text-base">
          <Img
            src={`${baseUrl}/static/netlify-logo.png`}
            width="184"
            height="75"
            alt="Netlify"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-white">
            <Heading className="my-0 text-center leading-8">{title}</Heading>

            <Section>
              <Row>
                <Text className="text-center text-base">{subtitle}</Text>
              </Row>
            </Section>

            {type === 'welcome' && (
              <>
                <Text className="text-base">Here's how to get started:</Text>
                <ul>{steps?.map(({ Description }) => Description)}</ul>
              </>
            )}

            <Section className="text-center">
              <Button className="bg-brand rounded-lg px-[18px] py-3 text-white">
                {buttonText}
              </Button>
            </Section>

            <Section className="mt-45">
              <Row>
                {links?.map((link) => (
                  <Column key={link}>
                    <Link className="font-bold text-black underline">
                      {link}
                    </Link>{' '}
                    <span className="text-green-500">→</span>
                  </Column>
                ))}
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="px-20 text-right">
                  <Link>Unsubscribe</Link>
                </Column>
                <Column className="text-left">
                  <Link>Manage Preferences</Link>
                </Column>
              </Row>
            </Section>
            <Text className="mb-45 text-center text-gray-400">
              Netlify, 44 Montgomery Street, Suite 300 San Francisco, CA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Welcome;

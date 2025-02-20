import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from '@react-email/components';
import React from 'react';

export default function WelcomeEmail({
  fullName,
}: {
  fullName: string;
  message: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
        <Container
          style={{
            maxWidth: '600px',
            margin: 'auto',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Heading style={{ color: '#333' }}>
            Welcome to the platform, ${fullName}!
          </Heading>
          <Text style={{ color: '#555' }}>
            We’re excited to have you. Click below to explore:
          </Text>
          <Button
            href="https://zaprojekte.com"
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

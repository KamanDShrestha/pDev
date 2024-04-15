import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import ProfilePersonalDetails from '../../src/components/ProfilePersonalDetailsCard';
import React from 'react';
import AuthProvider from '../../src/context/AuthProvider';

describe('ProfilePersonalDetails', () => {
  const queryClient = new QueryClient();
  server.use(
    http.get('/auth/user', () => {
      return HttpResponse.json({
        success: true,
        message: 'User authenticated',
        data: {
          dateOfBirth: '2003-02-09T00:00:00.000Z',
          email: 'kamanD@gmail.com',
          firstName: 'KamanD',
          hasSubscribed: true,
          id: '653dfc7a278b2f19c3f3799c',
          image:
            'https://res.cloudinary.com/dzswzpucc/image/upload/v1709705578/lzxsbn0imvkcrzjmv3an.png',
          isNewUser: false,
          lastName: 'Shrestha',
          loggedMood: false,
          preferredJourney: 'Mindfulness',
          role: 'admin',
        },
      });
    })
  );

  it('should render the profile details', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProfilePersonalDetails />
        </AuthProvider>
      </QueryClientProvider>
    );

    // Check if the mock endpoint has been requested and the data is displayed
    const nameElements = await screen.findAllByText(/KamanD/i);
    expect(nameElements.length).toBeGreaterThan(0);
    const lastNameElements = await screen.findAllByText(/Shrestha/i);
    expect(lastNameElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/kamanD@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();

    screen.debug();
  });
});

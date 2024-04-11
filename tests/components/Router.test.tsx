import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '../../src/context/AuthProvider';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('Router', () => {
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

  // it('should render the home page for /', () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter initialEntries={['/login']}>
  //         <App />
  //       </MemoryRouter>
  //     </QueryClientProvider>
  //   );

  //   // finding if the login image is present
  //   expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  // });

  // it('should render the not found page for /journeyNotFound', () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter initialEntries={['/journeyNotFound']}>
  //         <App />
  //       </MemoryRouter>
  //     </QueryClientProvider>
  //   );

  //   expect(screen.getByText('404')).toBeInTheDocument();
  //   expect(screen.getByText(/not found/i)).toBeInTheDocument();
  //   expect(screen.getByRole('link')).toHaveTextContent(
  //     new RegExp('go back', 'i')
  //   );
  // });

  it('should render the protected route for /journeys', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter initialEntries={['/journeys']}>
            <App />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>
    );

    const nameElements = await screen.findAllByText(/KamanD/i);
    expect(nameElements.length).toBeGreaterThan(0);

    expect(await screen.findAllByText(/journeys/i)).toBeInTheDocument();
    screen.debug();
  });
});

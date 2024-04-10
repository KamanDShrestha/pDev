import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
describe('Router', () => {
  it('should render the home page for /', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    screen.debug();

    // finding if the login image is present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should render the home page for /', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={['/journeyNotFound']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    screen.debug();

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(
      new RegExp('go back', 'i')
    );
  });
});

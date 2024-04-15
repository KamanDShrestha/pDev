import React from 'react';
import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import Community from '../../src/pages/Community';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

describe('Community', () => {
  const queryClient = new QueryClient();
  server.use(
    http.get('/community/get', () => {
      return HttpResponse.json({
        data: [
          {
            communityDescription: 'Community for people interested in Mindset.',
            communityIcon: {
              dark: 'http://res.cloudinary.com/dzswzpucc/image/upload/aldkfdklfjkld.png',
              light:
                'http://res.cloudinary.com/dzswzpucc/image/upload/dfladjfldkjf.png',
            },
            communityName: 'Community for Mindset',
            createdAt: '2023-12-11T07:26:16.133Z',
            createdDate: '2023-12-11T07:26:16.125Z',
            journeyId: '6548ddcf6546449601eeaa08',
            updatedAt: '2024-03-03T06:26:35.334Z',
            _id: '6576b9988de3cda4eeb00a4f',
          },
          {
            communityDescription:
              'Community for people interested in Mindfulness.',
            communityIcon: {
              dark: 'http://res.cloudinary.com/dzswzpucc/image/upload/aldkqwqrjkld.png',
              light:
                'http://res.cloudinary.com/dzswzpucc/image/upload/dfnxadjfldkjf.png',
            },
            communityName: 'Community for Mindfulness',
            createdAt: '2023-10-11T07:26:16.133Z',
            createdDate: '2023-10-11T07:26:16.125Z',
            journeyId: '6548ddcf6546449601eeaa08',
            updatedAt: '2024-01-03T06:26:35.334Z',
            _id: '6576b9988de3cda4eeb00a4f',
          },
        ],
      });
    })
  );
  it('should render the list of communities', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Community />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // finding different elements in the community page
    const communityFirstTitle = await screen.findByText(
      /Community for Mindset/i
    );
    expect(communityFirstTitle).toBeInTheDocument();
    const communitySecondTitle = await screen.findByText(
      /Community for Mindfulness/i
    );
    expect(communitySecondTitle).toBeInTheDocument();

    const images = await screen.findAllByRole('img');

    expect(images.length).toBe(2);
    expect(images[1]).toHaveAttribute(
      'src',
      'http://res.cloudinary.com/dzswzpucc/image/upload/dfnxadjfldkjf.png'
    );
  });
});

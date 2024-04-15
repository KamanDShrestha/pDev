import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import VideoCard from '../../src/components/LearningVideoCard';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

describe('VideoCard', () => {
  const video = {
    author: 'Philosophy Tube',
    embedUrl: 'https://www.youtube.com/embed/lSvKNNtkUSU?si=qCGmRhGOW-BwDoqr',
    moodSpecific: 'high',
    title: 'Ancient Therapy for Modern Problems: Stoic Philosophy Explained',
    url: 'https://youtu.be/lSvKNNtkUSU?si=IYhj94AQNwdz5mfb',
    _id: '65e5ee8f44da8183d334f284',
  };

  it('should render title of the video card', () => {
    const queryClient = new QueryClient();

    // rendering the video card component
    render(
      <QueryClientProvider client={queryClient}>
        <VideoCard video={video} />
      </QueryClientProvider>
    );

    //testing for the title of the video card
    expect(
      screen.getByText(new RegExp(video.title.slice(0, 10), 'i'))
    ).toBeInTheDocument();
  });

  it('should render Youtube video within Video card', () => {
    const queryClient = new QueryClient();

    // rendering the video card component
    render(
      <QueryClientProvider client={queryClient}>
        <VideoCard video={video} />
      </QueryClientProvider>
    );

    // testing for the youtube video within the video card
    const renderedVideo = screen.getByTitle(video.title);
    expect(renderedVideo).toHaveAttribute('src', video.embedUrl);
  });
});

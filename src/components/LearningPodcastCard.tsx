import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import TruncatedText from './TruncatedText';
import { Separator } from '@radix-ui/react-separator';
import { LearningPodcast } from '../types';

interface LearningPodcastCardProps {
  podcast: LearningPodcast;
}

const LearningPodcastCard = ({ podcast }: LearningPodcastCardProps) => {
  return (
    <Card className='w-[360px] h-[200px]'>
      <CardHeader>
        <CardTitle className='text-md'>
          <TruncatedText content={podcast.title} limit={75} />
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <iframe
          style={{ borderRadius: '12px' }}
          src={podcast.embedUrl}
          width='100%'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        ></iframe>
      </CardContent>
    </Card>
  );
};

export default LearningPodcastCard;

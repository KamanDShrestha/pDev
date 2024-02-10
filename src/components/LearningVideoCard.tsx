import { LearningVideo } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from '@radix-ui/react-separator';
import TruncatedText from './TruncatedText';

interface LearningVideoCardProps {
  video: LearningVideo;
}

const LearningVideoCard = ({ video }: LearningVideoCardProps) => {
  return (
    <Card className='w-[360px]'>
      <CardHeader>
        <CardTitle className='text-md'>
          <TruncatedText content={video.title} limit={75} />
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className='h-[250px]'>
        <iframe
          className='w-full h-full rounded-lg shadow-md'
          src={video.embedUrl}
          title={video.title}
          style={{ border: 'none' }}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </CardContent>
    </Card>
  );
};

export default LearningVideoCard;

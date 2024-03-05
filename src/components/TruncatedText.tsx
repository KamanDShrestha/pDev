import { cn } from '../lib/utils';

interface TruncatedTextProps {
  content: string;
  limit?: number;
  className?: string;
}

const TruncatedText = ({
  content,
  limit = 200,
  className,
}: TruncatedTextProps) => {
  const needTruncation = content.length > limit;

  const truncatedContent = content.slice(0, limit);
  return (
    <span className={cn(className)}>
      {needTruncation ? `${truncatedContent}...` : content}
    </span>
  );
};

export default TruncatedText;

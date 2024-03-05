import { useState } from 'react';
import { cn } from '../lib/utils';

interface ExpandableTextProps {
  content: string;
  length?: number;
  className?: string;
}

// check if the content length is greater than the length prop
// if it is, truncate the content and provide a button to expand
// if not, just display the content
// when the button is clicked, expand the content
// if the content is already expanded, display the full content
// if not, display the truncated content and the expand button
// length props provides the limit to initial display of the content

const ExpandableText = ({
  content,
  length = 100,
  className,
}: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const provideExpandButton = content.length > length;

  const expandableText = !provideExpandButton
    ? content
    : isExpanded
    ? content
    : `${content.slice(0, length)}...`;

  function handleExpandButton() {
    setIsExpanded(!isExpanded);
  }

  return (
    <span className={cn(className)}>
      {expandableText}{' '}
      {provideExpandButton && (
        <button
          onClick={handleExpandButton}
          className='text-xs underline hover:text-blue-500'
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </span>
  );
};

export default ExpandableText;

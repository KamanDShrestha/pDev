interface TruncatedTextProps {
  content: string;
  limit?: number;
}

const TruncatedText = ({ content, limit = 200 }: TruncatedTextProps) => {
  const needTruncation = content.length > limit;

  const truncatedContent = content.slice(0, limit);
  return <span>{needTruncation ? `${truncatedContent}...` : content}</span>;
};

export default TruncatedText;

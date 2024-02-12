import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useDocumentTitle(title: string) {
  const location = useLocation();
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title, location]);
}

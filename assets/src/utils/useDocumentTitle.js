import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(
    () => {
      const originalTitle = document.title;
      if (title) document.title = `${title} - Kamu`;

      return () => {
        document.title = originalTitle;
      };
    },
    [title],
  );
}

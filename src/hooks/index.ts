/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

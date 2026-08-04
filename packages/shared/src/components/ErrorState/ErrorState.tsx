import { useEffect } from 'react';

interface ErrorStateProps {
  error: Error | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>Something went wrong.</div>;
};

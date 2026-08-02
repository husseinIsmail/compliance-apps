interface ErrorStateProps {
  error: Error | null;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  console.error(error?.message);
  return <div>Error occured while fetching data.`</div>;
};

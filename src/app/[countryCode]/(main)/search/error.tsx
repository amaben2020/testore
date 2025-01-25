'use client';

const Error = ({ error, reset }: { error: Error } & { reset: () => void }) => {
  return <button onClick={reset}>Error {error.message}</button>;
};

export default Error;

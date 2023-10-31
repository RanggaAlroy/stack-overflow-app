import React from 'react';
import Form from '@/components/shared/Form';

const page = () => {
  return (
    <>
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
        <div className="mt-9">
          <Form></Form>
        </div>
      </div>
    </>
  );
};

export default page;

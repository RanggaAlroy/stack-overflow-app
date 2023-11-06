import Question from '@/components/forms/Question';
import React from 'react';
// import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.action';

const page = async () => {
  // const { userId } = auth();
  const userId = '5f83c9a3a08b540b38e9684f';

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById(userId);

  console.log(mongoUser);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;

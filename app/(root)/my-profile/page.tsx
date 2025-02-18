import { desc, eq } from 'drizzle-orm';
import { Session } from 'next-auth';
import React from 'react';

import BookList from '@/components/BookList';
import { db } from '@/database/drizzle';
import { borrowRecords, users } from '@/database/schema';

const Profile = async ({ session }: { session: Session }) => {
  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .where(eq(users.id, session?.user?.id))
    .orderBy(desc(borrowRecords.createdAt))
    .execute();
  return (
    <>
      <BookList
        title="Borrowed Books"
        books={borrowedBooks}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Profile;

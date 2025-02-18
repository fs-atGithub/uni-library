import { desc } from 'drizzle-orm';
import React from 'react';

import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { borrowRecords } from '@/database/schema';

const Profile = async () => {
  const borrowedBooks = (await db
    .select()
    .from(borrowRecords)
    .limit(10)
    .orderBy(desc(borrowRecords.createdAt))) as Book[];

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

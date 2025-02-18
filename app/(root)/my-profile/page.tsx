import { desc } from 'drizzle-orm';
import React from 'react';

import BookList from '@/components/BookList';
import { db } from '@/database/drizzle';
import { borrowRecords } from '@/database/schema';

const Profile = async () => {
  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .orderBy(desc(borrowRecords.createdAt));

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

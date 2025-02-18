import { desc } from 'drizzle-orm';
import React from 'react';

import BookList from '@/components/BookList';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';

const Profile = async () => {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookList
        title="Borrowed Books"
        books={latestBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Profile;

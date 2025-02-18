'use client';

import { desc, eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';

import BookList from '@/components/BookList';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';

const Profile = ({ userId }: { userId: string }) => {
  const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const booksData = await db
          .select({
            id: books.id,
            title: books.title,
            author: books.author,
            borrowDate: borrowRecords.borrowDate,
            dueDate: borrowRecords.dueDate,
            returnDate: borrowRecords.returnDate,
            status: borrowRecords.status,
          })
          .from(borrowRecords)
          .innerJoin(books, eq(borrowRecords.bookId, books.id))
          .where(eq(borrowRecords.userId, userId))
          .orderBy(desc(borrowRecords.borrowDate))
          .limit(10);

        setBorrowedBooks(booksData);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {borrowedBooks.length > 0 ? (
        <BookList
          title="Borrowed Books"
          books={borrowedBooks}
          containerClassName="mt-28"
        />
      ) : (
        <p>No borrowed books found.</p>
      )}
    </>
  );
};

export default Profile;

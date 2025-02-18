'use client';
import { eq } from 'drizzle-orm'; // Import the equality operator
import React, { useEffect, useState } from 'react';

import { auth, signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { borrowRecords } from '@/database/schema'; // Import your borrowRecords schema

const Page = async () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const session = auth(); // Get the user session

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (session?.user?.id) {
        try {
          const records = await db
            .select()
            .from(borrowRecords)
            .where(eq(borrowRecords.userId, session.user.id))
            .execute();

          // Fetch book details based on bookId.  This is a placeholder.
          // You'll likely need another query to your 'books' table.
          const books = await Promise.all(
            records.map(async (record) => {
              // Replace this with your actual book fetching logic.
              // Example using a hypothetical 'books' table:
              const book = await db
                .select()
                .from(books)
                .where(eq(books.id, record.bookId))
                .execute();
              return { ...book[0], borrowRecord: record }; // Combine book data with borrow record
            })
          );
          setBorrowedBooks(books);
        } catch (error) {
          console.error('Error fetching borrowed books:', error);
          // Handle error, e.g., display a message to the user
        }
      }
    };

    fetchBorrowedBooks();
  }, [session?.user?.id]); // Re-fetch when user ID changes

  return (
    <>
      {/* Conditionally render the BookList or a message */}
      {borrowedBooks.length > 0 ? (
        <BookList title="Borrowed Books" books={borrowedBooks} />
      ) : (
        <p>You haven&apos;t borrowed any books yet.</p>
      )}
    </>
  );
};

export default Page;

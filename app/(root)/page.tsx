import React from 'react';

import BookList from '@/components/BookList';
import BookOverview from '@/components/BookOverview';
import { sampleBooks } from '@/constants';

const Page = () => {
  return (
    <>
      <BookOverview {...sampleBooks[6]} />
      <BookList
        title={'Latest books'}
        books={sampleBooks}
        containerClassName={'mt-28'}
      />
    </>
  );
};
export default Page;

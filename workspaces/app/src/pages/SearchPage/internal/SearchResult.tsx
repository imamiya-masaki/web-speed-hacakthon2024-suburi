import { Suspense } from 'react';

import type { GetBookListResponse } from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';
import { useBookList } from '../../../features/book/hooks/useBookList';

type Props = {
  keyword: string;
};
export const SearchResult: React.FC<Props> = ({ keyword }) => {

  const { data: books } = useBookList({ query: {keyword} });

  const relatedBooks = books;
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        {relatedBooks.map((book) => (
          <BookListItem key={book.id} bookId={book.id} insertBook={book}/>
        ))}
        {relatedBooks.length === 0 && (
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            関連作品は見つかりませんでした
          </Text>
        )}
      </Suspense>
    </Flex>
  );
};

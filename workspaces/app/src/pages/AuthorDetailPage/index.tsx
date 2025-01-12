import { Suspense, useId, useState, useEffect, startTransition} from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import './index.module.css'
import invariant from 'tiny-invariant';

import type { useAuthor } from '../../features/author/hooks/useAuthor';
import { BookListItem } from '../../features/book/components/BookListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { useImage } from '../../foundation/hooks/useImage';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { authorApiClient } from '../../features/author/apiClient/authorApiClient';
import { unstable_serialize } from 'swr';

const AuthorDetailPage: React.FC = () => {
  const { authorId } = useParams<RouteParams<'/authors/:authorId'>>();
  invariant(authorId);

  const [author, setAuthor] = useState<ReturnType<typeof useAuthor>["data"]>({id: "", name: "", image: {id: "", alt: ""},description:"", books: []});
  useEffect(() => {
    startTransition(() => {
      try {
        const injectDataScript = document.getElementById('inject-data');
        const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
        setAuthor(injectData[unstable_serialize(authorApiClient.fetch$$key({ params: {authorId} }))])
        } catch (error) {
          console.error({error})
        }
    })
  },[])

  if (author === undefined) {
    return <Box height="100%" px={Space * 2}><section className='index___HeadingWrapper__styled' aria-label="作者情報"></section></Box>
  }

  const imageUrl = useImage({ height: 128, imageId: author.image.id, width: 128 });
  const bookListA11yId = useId();

  return (
    <Box height="100%" px={Space * 2}>
      <section className='index___HeadingWrapper__styled' aria-label="作者情報">
        {imageUrl != null && (
          <div className='index___AuthorImageWrapper__styled'>
            <Image className='use-image-alternative' key={author.id} alt={author.name} height={128} objectFit="cover" src={imageUrl} width={128} />
          </div>
        )}

        <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
          <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
            {author.name}
          </Text>
          <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
            {author.description}
          </Text>
        </Flex>
      </section>

      <Separator />

      <Box aria-labelledby={bookListA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text as="h2" color={Color.MONO_100} id={bookListA11yId} typography={Typography.NORMAL20} weight="bold">
          作品一覧
        </Text>

        <Spacer height={Space * 2} />

        <Flex align="center" as="ul" direction="column" justify="center">
          {author.books.map((book) => (
            <BookListItem key={book.id} bookId={book.id} insertBook={book}/>
          ))}
          {author.books.length === 0 && (
            <>
              <Spacer height={Space * 2} />
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                この作者の作品はありません
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

const AuthorDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <AuthorDetailPage />
    </Suspense>
  );
};

export { AuthorDetailPageWithSuspense as AuthorDetailPage };

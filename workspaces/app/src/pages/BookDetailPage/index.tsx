import './index.module.css'

import { useAtom } from 'jotai/react';
import { Suspense, startTransition, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import { FavoriteBookAtomFamily } from '../../features/book/atoms/FavoriteBookAtomFamily';
import type { useBook } from '../../features/book/hooks/useBook';
import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Image } from '../../foundation/components/Image';
import { Link } from '../../foundation/components/Link';
import { Separator } from '../../foundation/components/Separator';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { useImage } from '../../foundation/hooks/useImage';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { BottomNavigator } from './internal/BottomNavigator';
import { unstable_serialize } from 'swr';
import { bookApiClient } from '../../features/book/apiClient/bookApiClient';
import { episodeApiClient } from '../../features/episode/apiClient/episodeApiClient';

type Book = ReturnType<typeof useBook>["data"];

const BookComponent = ({bookId}: {bookId: string}) => {
  const [book, setBook] = useState<Book>({
    id: "",
    name: "",
    description: "",
    nameRuby: "",
    author: {
      "id": "",
      "name": "",
      "image": {
        "alt": "",
        "id": ""
      },
      "description": ""
    },
    "episodes": [],
    "image": {
      "alt": "",
      id: ""
    }
  });
  useEffect(() => {
    startTransition(() => {
      try {
        const injectDataScript = document.getElementById('inject-data');
        const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
        const key = unstable_serialize(bookApiClient.fetch$$key({params:{bookId}}));
        console.log('key', key, injectData, injectData[key], JSON.stringify(injectData[key]))
        setBook(injectData[key])
        } catch (error) {
          console.error({error})
        }
    })
  },[])

  const bookImageUrl = useImage({ height: 256, imageId: book.image.id, width: 192 });
  const auhtorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return       <section className='index___HeadingWrapper__styled' aria-label="作品情報">
  {bookImageUrl != null && (
    <Image alt={book.name} height={256} className='use-image-alternative' objectFit="cover" src={bookImageUrl} width={192} />
  )}
  <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
    <Box>
      <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
        {book.name}
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
        {book.description}
      </Text>
    </Box>

    <Spacer height={Space * 1} />

    <Link className='index___AuthorWrapper__styled' href={`/authors/${book.author.id}`}>
      {auhtorImageUrl != null && (
        <div className='index___AvatarWrapper__styled'>
          <Image alt={book.author.name} height={32} className='use-image-alternative' objectFit="cover" src={auhtorImageUrl} width={32} />
        </div>
      )}
      <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
        {book.author.name}
      </Text>
    </Link>
  </Flex>
</section>
}

const EpisodeComponent = ({bookId}: {bookId: string}) => {
  const [episodeList, setEpisode] = useState<ReturnType<typeof useEpisodeList>["data"]>([]);
  const [isFavorite, toggleFavorite] = useAtom(FavoriteBookAtomFamily(bookId));

  const handleFavClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  const latestEpisode = episodeList?.find((episode) => episode.chapter === 1);

  useEffect(() => {
    startTransition(() => {
      try {
        const injectDataScript = document.getElementById('inject-data');
        const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
        setEpisode(injectData[unstable_serialize(episodeApiClient.fetchList$$key({ query: {bookId} }))])
        } catch (error) {
          console.error({error})
        }
    })
  },[])

  if (episodeList === undefined ) {
    return null;
  }

  return (
  <>
        <BottomNavigator
        bookId={bookId}
        isFavorite={isFavorite}
        latestEpisodeId={latestEpisode?.id ?? ''}
        onClickFav={handleFavClick}
      />

      <Separator />
  <section aria-label="エピソード一覧">
  <Flex align="center" as="ul" direction="column" justify="center">
    {episodeList.map((episode) => (
      <EpisodeListItem key={episode.id} bookId={bookId} episodeId={episode.id} episode={episode}/>
    ))}
    {episodeList.length === 0 && (
      <>
        <Spacer height={Space * 2} />
        <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
          この作品はまだエピソードがありません
        </Text>
      </>
    )}
  </Flex>
</section>
</>
  )
}





const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<RouteParams<'/books/:bookId'>>();
  invariant(bookId);



  return (
    <Box height="100%" position="relative" px={Space * 2}>
      <BookComponent bookId={bookId}/>
      <EpisodeComponent bookId={bookId}/>
    </Box>
  );
};

const BookDetailPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <BookDetailPage />
    </Suspense>
  );
};

export { BookDetailPageWithSuspense as BookDetailPage };

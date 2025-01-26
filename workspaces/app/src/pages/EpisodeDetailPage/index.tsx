import { Suspense, startTransition, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RouteParams } from 'regexparam';
import invariant from 'tiny-invariant';

import { EpisodeListItem } from '../../features/episode/components/EpisodeListItem';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Separator } from '../../foundation/components/Separator';
import { Space } from '../../foundation/styles/variables';

import { ComicViewer } from './internal/ComicViewer';
import { unstable_serialize } from 'swr';
import { episodeApiClient } from '../../features/episode/apiClient/episodeApiClient';
import type { useEpisodeList } from '../../features/episode/hooks/useEpisodeList';

const BookComponent = ({bookId}: {bookId: string}) => {
  const [episodeList, setEpisodeList] = useState<ReturnType<typeof useEpisodeList>["data"]>([]);
  useEffect(() => {
    startTransition(() => {
      try {
        const injectDataScript = document.getElementById('inject-data');
        const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
        const key = unstable_serialize(episodeApiClient.fetchList$$key({ query: {bookId} }));
        setEpisodeList(injectData[key])
        } catch (error) {
          console.error({error})
        }
    })
  },[])

  return (<Flex align="center" as="ul" direction="column" justify="center">
  {episodeList.map((episode: any) => (
    <EpisodeListItem key={episode.id} bookId={bookId} episodeId={episode.id} episode={episode}/>
  ))}
</Flex>)
}

const EpisodeComponent = ({episodeId}: {episodeId: string}) => {
  const [episode, setEpisode] = useState<any>();

  useEffect(() => {
    startTransition(() => {
      try {
        const injectDataScript = document.getElementById('inject-data');
        const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
        const data = injectData[unstable_serialize(episodeApiClient.fetch$$key({params:{episodeId}}))]
        setEpisode(data)
        } catch (error) {
          console.error({error})
        }
    })
  },[])

  return (     episode ? <section aria-label="漫画ビューアー">
  <ComicViewer episodeId={episode.id} episode={episode}/>
</section>: null)
}


const EpisodeDetailPage: React.FC = () => {
  const { bookId, episodeId } = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  invariant(bookId);
  invariant(episodeId);

  return (
    <Box>
      <EpisodeComponent episodeId={episodeId}/>

      <Separator />
      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <BookComponent bookId={bookId}/>
      </Box>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
      <EpisodeDetailPage />
  );
};

export { EpisodeDetailPageWithSuspense as EpisodeDetailPage };

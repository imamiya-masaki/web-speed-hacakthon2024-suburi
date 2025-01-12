import './index.css'

import { useState, useEffect, Suspense, startTransition } from 'react';

import { BookCard } from '../../features/book/components/BookCard';
import { FeatureCard } from '../../features/feature/components/FeatureCard';
import { RankingCard } from '../../features/ranking/components/RankingCard';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { CoverSection } from './internal/CoverSection';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';
import { Container } from '../../foundation/components/Container';
import { Footer } from '../../foundation/components/Footer';
import { unstable_serialize } from 'swr';
import { featureApiClient } from '../../features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '../../features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '../../features/release/apiClient/releaseApiClient';

function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

const FeatureList = () => {
  const [featureList, setFeatureList] = useState<any[]>();

  useEffect(() => {
    startTransition(() => {
      try {
        const injectDataScript = document.getElementById('inject-data');
        const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
        setFeatureList(injectData[unstable_serialize(featureApiClient.fetchList$$key({query:{}}))])
        } catch (error) {
          console.error({error})
        }
    })
  },[])

  return <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start" className='toppage-pickup'>
    {featureList?.map((feature: any) => (
        <FeatureCard key={feature.id} bookId={feature.book.id} insertBook={feature.book}/>
      ))
    }</Flex>
}

const RankingList = () => {

  const [rankingList, setRankingList] = useState<any[]>();

  useEffect(() => {
    startTransition(() => {
    try {
      const injectDataScript = document.getElementById('inject-data');
      const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
      setRankingList(injectData[unstable_serialize(rankingApiClient.fetchList$$key({query:{}}))])
    } catch (error) {
      console.error({error})
    }
  });
  },[])

  return <Flex align="center" as="ul" direction="column" justify="center" className={'toppage-ranking'}>
    {rankingList?.map((ranking: any) => (
         <RankingCard key={ranking.id} bookId={ranking.book.id} insertBook={ranking.book}/>
      ))
    }</Flex>
}

const ReleaseList = () => {
  const todayStr = getDayOfWeekStr();

  const [release, setRelease] = useState<{books: any[]}>();

  useEffect(() => {
    startTransition(() => {
    try {
      const injectDataScript = document.getElementById('inject-data');
      const injectData = JSON.parse(injectDataScript?.textContent || '{}') as any;
      const key = unstable_serialize(releaseApiClient.fetch$$key({params:{ dayOfWeek: todayStr }}));
      setRelease(injectData[key])
    } catch (error) {
      console.error({error})
    }
  });
  },[])

  return (<Flex align="stretch" gap={Space * 2} justify="flex-start" className='toppage-release'>
  <Suspense fallback={null}>
    {release?.books.map((book: any) => (
      <BookCard key={book.id} bookId={book.id} insertBook={book}/>
    ))}
  </Suspense>
</Flex>)
}

const TopPage: React.FC = () => {

  const pickupA11yId = "pickupA11yId";
  const rankingA11yId = "rankingA11yId";
  const todayA11yId = "todayA11yId";
  
  return (
    <Container>
        <Box as="header" maxWidth="100%" width="100%">
          <CoverSection />
        </Box>
        <div className='CommonLayout___Content__styled'>
          <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
              <Box as="main" maxWidth="100%" width="100%">
                <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
                  <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
                    ピックアップ
                  </Text>
                  <Spacer height={Space * 2} />
                  <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
                     <FeatureList/>
                  </Box>
                </Box>

                <Spacer height={Space * 2} />

                <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
                  <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
                    ランキング
                  </Text>
                  <Spacer height={Space * 2} />
                  <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
                        <RankingList />
                  </Box>
                </Box>

                <Spacer height={Space * 2} />
                  <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
                    <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
                      本日更新
                    </Text>
                    <Spacer height={Space * 2} />
                    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
                      <ReleaseList />
                    </Box>
                  </Box>
              </Box>
          </Flex>
      </div>
      <Footer />
    </Container>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
      <TopPage />
  );
};

export { TopPageWithSuspense as TopPage };

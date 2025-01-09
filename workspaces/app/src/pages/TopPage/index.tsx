import './index.css'

// import moment from 'moment-timezone';
import { useId, useState, useEffect, Suspense } from 'react';

import { BookCard } from '../../features/book/components/BookCard';
import { FeatureCard } from '../../features/feature/components/FeatureCard';
import { RankingCard } from '../../features/ranking/components/RankingCard';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
// import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

import { CoverSection } from './internal/CoverSection';
import { useRelease } from '../../features/release/hooks/useRelease';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';
const TopPage: React.FC = () => {
  const todayStr = getDayOfWeekStr();

  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });
  const { data: featureList } = useFeatureList({ query: {} });
  const { data: rankingList } = useRankingList({ query: {} });
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();
  console.log({release, featureList, rankingList})
  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
            ピックアップ
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
              <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start" className='toppage-pickup'>
                <Suspense fallback={null}>
                  {featureList?.map((feature: any) => (
                    <FeatureCard key={feature.id} bookId={feature.book.id} insertBook={feature.book}/>
                  ))}
                </Suspense>
              </Flex>
          </Box>
        </Box>

        <Spacer height={Space * 2} />

        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
          <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
            ランキング
          </Text>
          <Spacer height={Space * 2} />
          <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
              <Flex align="center" as="ul" direction="column" justify="center" className={'toppage-ranking'}>
              <Suspense fallback={null}>
                {rankingList?.map((ranking: any) => (
                  <RankingCard key={ranking.id} bookId={ranking.book.id} insertBook={ranking.book}/>
                ))}
              </Suspense>
              </Flex>
          </Box>
        </Box>

        <Spacer height={Space * 2} />
          <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
            <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
              本日更新
            </Text>
            <Spacer height={Space * 2} />
            <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
              <Flex align="stretch" gap={Space * 2} justify="flex-start" className='toppage-release'>
                <Suspense fallback={null}>
                  {release?.books.map((book: any) => (
                    <BookCard key={book.id} bookId={book.id} insertBook={book}/>
                  ))}
                </Suspense>
              </Flex>
            </Box>
          </Box>
      </Box>
    </Flex>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
      <TopPage />
  );
};

export { TopPageWithSuspense as TopPage };

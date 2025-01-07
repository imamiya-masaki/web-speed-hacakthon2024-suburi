import './index.css'

import _ from 'lodash';
// import moment from 'moment-timezone';
import { Suspense, useId, useState, useEffect } from 'react';

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

const TopPage: React.FC = () => {
  // const todayStr = getDayOfWeekStr(moment());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [release, setRelease] = useState<any>({dayOfWeek: "", id: "", books: []});
  const [featureList, setFeatureList] = useState<any>([]);
  const [rankingList, setRankingList] = useState<any>([]);
  useEffect(() => {
    setRelease((window as any).injectData.releases)
    setFeatureList((window as any).injectData.features)
    setRankingList((window as any).injectData.ranking)
    setIsLoaded(true)
  },[])

  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

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
                {_.map(featureList, (feature) => (
                  <FeatureCard key={feature.id} bookId={feature.book.id} insertBook={feature.book}/>
                ))}
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
              <Flex align="center" as="ul" direction="column" justify="center" className={`${!isLoaded ? 'toppage-ranking' : ''}`}>
                {_.map(rankingList, (ranking) => (
                  <RankingCard key={ranking.id} bookId={ranking.book.id} insertBook={ranking.book}/>
                ))}
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
                {_.map(release.books, (book) => (
                  <BookCard key={book.id} bookId={book.id} insertBook={book}/>
                ))}
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

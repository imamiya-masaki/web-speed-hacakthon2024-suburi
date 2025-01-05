import { Suspense } from 'react';
import './RankingCard.module.css'

import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Space, Typography } from '../../../foundation/styles/variables';
import { useBook } from '../../book/hooks/useBook';
import { NavigateNext } from '@mui/icons-material';
import { Book } from '../../../lib/type';

type Props = {
  bookId: string;
  insertBook: Omit<Book,"nameRuby" | "episodes">;
};

const RankingCard: React.FC<Props> = ({ bookId, insertBook }) => {
  const book = insertBook ??  useBook({ params: { bookId } }).data;

  const imageUrl = useImage({ height: 96, imageId: book.image.id, width: 96 });
  const authorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return (
    <li className='RankingCard___Wrapper__styled'>
      <Link className='RankingCard___Link__styled' href={`/books/${book.id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          {imageUrl != null && (
            <div className='RankingCard___ImgWrapper__styled'>
              <Image alt={book.name} height={96} className='use-image-alternative' objectFit="cover" src={imageUrl} width={96} />
            </div>
          )}
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              {authorImageUrl != null && (
                <div className='RankingCard___AvatarWrapper__styled'>
                  <Image
                  className='use-image-alternative'
                    alt={`${book.author.name}のアイコン`}
                    height={32}
                    objectFit="cover"
                    src={authorImageUrl}
                    width={32}
                  />
                </div>
              )}
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <NavigateNext style={{color: Color.Secondary, height: 32, width: 32}} />
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </Link>
    </li>
  );
};

const RankingCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <RankingCard {...props} />
    </Suspense>
  );
};

export { RankingCardWithSuspense as RankingCard };

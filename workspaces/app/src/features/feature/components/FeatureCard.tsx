import { Suspense } from 'react';
import './FeatureCard.module.css'

import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

import {BookType} from '../../../lib/type'

type Props = {
  bookId: string;
  insertBook: Omit<BookType,"nameRuby" | "episodes">;
};

const FeatureCard: React.FC<Props> = ({ bookId, insertBook }) => {
  const book = insertBook;

  const imageUrl = useImage({ height: 96, imageId: book.image.id, width: 96 });
  const authorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return (
    <Link  className='FeatureCard___Wrapper__styled' href={`/books/${bookId}`}>
      {imageUrl != null && (
        <div className='FeatureCard___ImgWrapper__styled'>
          <Image alt={book.image.alt} height={96} className='use-image-alternative' objectFit="cover" src={imageUrl} width={96} />
        </div>
      )}

      <div className='FeatureCard___ContentWrapper__styled'>
        <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
          {book.name}
        </Text>
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
          {book.description}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          {authorImageUrl != null && (
            <div className='FeatureCard___AvatarWrapper__styled'>
              <Image alt={book.author.name} height={32} className='use-image-alternative' objectFit="cover" src={authorImageUrl} width={32} />
            </div>
          )}
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            {book.author.name}
          </Text>
        </Flex>
      </div>
    </Link>
  );
};

const FeatureCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <FeatureCard {...props} />
    </Suspense>
  );
};

export { FeatureCardWithSuspense as FeatureCard };

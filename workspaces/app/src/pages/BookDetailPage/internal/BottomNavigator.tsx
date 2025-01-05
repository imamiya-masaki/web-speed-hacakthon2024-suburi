import { animated, useSpring } from '@react-spring/web';
import { useCallback } from 'react';
import './BottomNavigator.module.css';
import { Link } from '../../../foundation/components/Link';

import { FavButton } from './FavButton';

type Props = {
  bookId: string;
  isFavorite: boolean;
  latestEpisodeId: string;
  onClickFav: () => void;
};

export const BottomNavigator: React.FC<Props> = ({ bookId, isFavorite, latestEpisodeId, onClickFav }) => {
  const props = useSpring({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  });

  const handleFavClick = useCallback(() => {
    onClickFav();
  }, [onClickFav]);

  return (
    <div className='BottomNavigator___Wrapper__styled'>
      <animated.div style={props}>
        <div className='BottomNavigator___Content__styled'>
          <FavButton enabled={isFavorite} onClick={handleFavClick} />
          <Link className='BottomNavigator___ReadLink__styled' to={`/books/${bookId}/episodes/${latestEpisodeId}`}>最新話を読む</Link>
        </div>
      </animated.div>
    </div>
  );
};

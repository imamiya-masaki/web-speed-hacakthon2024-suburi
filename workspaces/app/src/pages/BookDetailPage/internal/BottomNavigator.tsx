// BottomNavigator.tsx
import { useEffect, useState, useCallback } from 'react';
import './BottomNavigator.module.css';
import { Link } from '../../../foundation/components/Link';
import { FavButton } from './FavButton';

type Props = {
  bookId: string;
  isFavorite: boolean;
  latestEpisodeId: string;
  onClickFav: () => void;
};

export const BottomNavigator: React.FC<Props> = ({
  bookId,
  isFavorite,
  latestEpisodeId,
  onClickFav,
}) => {
  const [isActive, setIsActive] = useState(false);

  // マウント時にクラスを有効化してスライドインさせる
  useEffect(() => {
    // 次のフレームでクラスを付与することで CSS transition を発火
    const id = requestAnimationFrame(() => {
      setIsActive(true);
    });
    // cleanup (unmount 時にキャンセル)
    return () => cancelAnimationFrame(id);
  }, []);

  const handleFavClick = useCallback(() => {
    onClickFav();
  }, [onClickFav]);

  return (
    <div className="BottomNavigator___Wrapper__styled">
      <div
        className={[
          'BottomNavigator___SlideIn',
          isActive && 'BottomNavigator___SlideInActive',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="BottomNavigator___Content__styled">
          <FavButton enabled={isFavorite} onClick={handleFavClick} />
          <Link
            className="BottomNavigator___ReadLink__styled"
            to={`/books/${bookId}/episodes/${latestEpisodeId}`}
          >
            最新話を読む
          </Link>
        </div>
      </div>
    </div>
  );
};

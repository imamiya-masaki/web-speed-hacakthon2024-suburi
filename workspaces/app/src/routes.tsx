import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { CommonLayout } from './foundation/layouts/CommonLayout';
import { Color, Space, Typography } from './foundation/styles/variables';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { EpisodeDetailPage } from './pages/EpisodeDetailPage';
import { SearchPage } from './pages/SearchPage';
import { TopPage } from './pages/TopPage';
import { ArrowBack } from '@mui/icons-material';

type LinkProps = Parameters<typeof Link>[0];

// インラインスタイルの定義
const backToTopButtonStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: `${Space * 1}px`,
  border: 'none',
  backgroundColor: 'transparent',
};

// _BackToTopButton コンポーネントの定義
const _BackToTopButton: React.FC<LinkProps> = ({ style, ...props }) => {
  const combinedStyle: React.CSSProperties = {
    ...backToTopButtonStyle,
    ...style, // 外部からのスタイルを上書き可能にする
  };

  return <Link {...props} style={combinedStyle} />;
};

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />} path={'/'}>
        <Route element={<TopPage />} path={''} />
      </Route>
      <Route
        element={
          <ActionLayout
            leftContent={
              <_BackToTopButton href={'/'}>
                <ArrowBack style={{color: Color.MONO_100, height: 32, width: 32}} />
                <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                  トップへ戻る
                </Text>
              </_BackToTopButton>
            }
          />
        }
        path={'/'}
      >
        <Route element={<BookDetailPage />} path={'books/:bookId'} />
        <Route element={<EpisodeDetailPage />} path={'books/:bookId/episodes/:episodeId'} />
        <Route element={<AuthorDetailPage />} path={'authors/:authorId'} />
        <Route element={<SearchPage />} path={'search'} />
      </Route>
    </Routes>
  );
};

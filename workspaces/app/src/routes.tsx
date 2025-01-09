import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { Color, Space, Typography } from './foundation/styles/variables';
import { AuthorDetailPage } from './pages/AuthorDetailPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { EpisodeDetailPage } from './pages/EpisodeDetailPage';
import { SearchPage } from './pages/SearchPage';
import { TopPage } from './pages/TopPage';

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

  useEffect(()=> {
    const newrelic = (window as any).newrelic as any 
    if (newrelic && newrelic.setCustomAttribute) {
      // 物理的な画面サイズを送る場合
      newrelic.setCustomAttribute('performanceInfo', JSON.stringify({
        width: window.screen.width,
        height: window.screen.height,
        url: window.location.href
      }));
    }
  },[])

  return (
    <Routes>
      <Route element={<TopPage />} path={''} />
      <Route
        element={
          <ActionLayout
            leftContent={
              <_BackToTopButton href={'/'}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#202020"><path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z" style={{color: Color.MONO_100, height: 32, width: 32}}/></svg>
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

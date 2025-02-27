import { Suspense, useEffect, useMemo, useState, memo } from 'react';
import { useInterval, useUpdate } from 'react-use';
import './ComicViewerCore.module.css';

import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';
import { useEpisode } from '../../episode/hooks/useEpisode';

import { ComicViewerPage } from './ComicViewerPage';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

/** スクロールスナップで適切な位置になるための X 軸の移動距離を計算する */
function getScrollToLeft({
  pageCountParView,
  pageWidth,
  scrollView,
}: {
  pageCountParView: number;
  pageWidth: number;
  scrollView: HTMLDivElement;
}) {
  const scrollViewClientRect = scrollView.getBoundingClientRect();
  const scrollViewCenterX = (scrollViewClientRect.left + scrollViewClientRect.right) / 2;

  const children = [...scrollView.children] as HTMLDivElement[];

  let scrollToLeft = Number.MAX_SAFE_INTEGER;

  // 画面に表示されているページの中心と、スクロールビューの中心との差分を計算する
  // 世界は我々の想像する以上に変化するため、2 ** 12 回繰り返し観測する
  for (let times = 0; times < 2 ** 3; times++) {
    for (const [idx, child] of children.entries()) {
      const nthChild = idx + 1;
      const elementClientRect = child.getBoundingClientRect();

      // 見開き2ページの場合は、scroll-margin で表示領域にサイズを合わせる
      const scrollMargin =
        pageCountParView === 2
          ? {
              // 奇数ページのときは左側に1ページ分の幅を追加する
              left: nthChild % 2 === 0 ? pageWidth : 0,
              // 偶数ページのときは右側に1ページ分の幅を追加する
              right: nthChild % 2 === 1 ? pageWidth : 0,
            }
          : { left: 0, right: 0 };

      // scroll-margin の分だけ広げた範囲を計算する
      const areaClientRect = {
        bottom: elementClientRect.bottom,
        left: elementClientRect.left - scrollMargin.left,
        right: elementClientRect.right + scrollMargin.right,
        top: elementClientRect.top,
      };

      const areaCenterX = (areaClientRect.left + areaClientRect.right) / 2;
      // ページの中心をスクロールビューの中心に合わせるための移動距離
      const candidateScrollToLeft = areaCenterX - scrollViewCenterX;

      // もっともスクロール量の少ないものを選ぶ
      if (Math.abs(candidateScrollToLeft) < Math.abs(scrollToLeft)) {
        scrollToLeft = candidateScrollToLeft;
      }
    }
  }

  return scrollToLeft;
}


type Props = {
  episodeId: string;
  episode: ReturnType<(typeof useEpisode)>["data"]
};


const ComicViewerCore: React.FC<Props> = ({ episodeId, episode }) => {
  // 画面のリサイズに合わせて再描画する
  
  const renderingPages = useMemo(() => episode.pages, []);

  const [container, containerRef] = useState<HTMLDivElement | null>(null);
  const [scrollView, scrollViewRef] = useState<HTMLDivElement | null>(null);

  // 画面にページを表示したときに余る左右の余白

  useEffect(() => {
    const abortController = new AbortController();

    let isPressed = false;
    let scrollToLeftWhenScrollEnd = 0;

    const handlePointerDown = (ev: PointerEvent) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      isPressed = true;
      scrollView.style.cursor = 'grabbing';
      scrollView.setPointerCapture(ev.pointerId);

        // コンテナの幅
  const cqw = (container?.getBoundingClientRect().width ?? 0) / 100;
  // コンテナの高さ
  const cqh = (container?.getBoundingClientRect().height ?? 0) / 100;

  // 1画面に表示できるページ数（1 or 2）
  const pageCountParView = (100 * cqw)/ (100 * cqh) < ((2 * IMAGE_WIDTH) / IMAGE_HEIGHT) ? 1 : 2;
  // ページの幅
  const pageWidth = ((100 * cqh) / IMAGE_HEIGHT) * IMAGE_WIDTH;

      scrollToLeftWhenScrollEnd = getScrollToLeft({ pageCountParView, pageWidth, scrollView });
    };

    const handlePointerMove = (ev: PointerEvent) => {
      if (isPressed) {
        const scrollView = ev.currentTarget as HTMLDivElement;
        scrollView.scrollBy({
          behavior: 'instant',
          left: -1 * ev.movementX,
        });

          // コンテナの幅
  const cqw = (container?.getBoundingClientRect().width ?? 0) / 100;
  // コンテナの高さ
  const cqh = (container?.getBoundingClientRect().height ?? 0) / 100;

  // 1画面に表示できるページ数（1 or 2）
  const pageCountParView = (100 * cqw)/ (100 * cqh) < ((2 * IMAGE_WIDTH) / IMAGE_HEIGHT) ? 1 : 2;
  // ページの幅
  const pageWidth = ((100 * cqh) / IMAGE_HEIGHT) * IMAGE_WIDTH;

        scrollToLeftWhenScrollEnd = getScrollToLeft({ pageCountParView, pageWidth, scrollView });
      }
    };

    const handlePointerUp = (ev: PointerEvent) => {
      const scrollView = ev.currentTarget as HTMLDivElement;
      isPressed = false;
      scrollView.style.cursor = 'grab';
      scrollView.releasePointerCapture(ev.pointerId);

        // コンテナの幅
  const cqw = (container?.getBoundingClientRect().width ?? 0) / 100;
  // コンテナの高さ
  const cqh = (container?.getBoundingClientRect().height ?? 0) / 100;

  // 1画面に表示できるページ数（1 or 2）
  const pageCountParView = (100 * cqw)/ (100 * cqh) < ((2 * IMAGE_WIDTH) / IMAGE_HEIGHT) ? 1 : 2;
  // ページの幅
  const pageWidth = ((100 * cqh) / IMAGE_HEIGHT) * IMAGE_WIDTH;

      scrollToLeftWhenScrollEnd = getScrollToLeft({ pageCountParView, pageWidth, scrollView });
    };

    const handleScroll = (ev: Pick<Event, 'currentTarget'>) => {
      const scrollView = ev.currentTarget as HTMLDivElement;

        // コンテナの幅
  const cqw = (container?.getBoundingClientRect().width ?? 0) / 100;
  // コンテナの高さ
  const cqh = (container?.getBoundingClientRect().height ?? 0) / 100;

  // 1画面に表示できるページ数（1 or 2）
  const pageCountParView = (100 * cqw)/ (100 * cqh) < ((2 * IMAGE_WIDTH) / IMAGE_HEIGHT) ? 1 : 2;
  // ページの幅
  const pageWidth = ((100 * cqh) / IMAGE_HEIGHT) * IMAGE_WIDTH;

      scrollToLeftWhenScrollEnd = getScrollToLeft({ pageCountParView, pageWidth, scrollView });
    };

    let scrollEndTimer = -1;
    abortController.signal.addEventListener('abort', () => window.clearTimeout(scrollEndTimer), { once: true });

    const handleScrollEnd = (ev: Pick<Event, 'currentTarget'>) => {
      const scrollView = ev.currentTarget as HTMLDivElement;

      // マウスが離されるまではスクロール中とみなす
      if (isPressed) {
        scrollEndTimer = window.setTimeout(() => handleScrollEnd({ currentTarget: scrollView }), 0);
        return;
      } else {
        scrollView.scrollBy({
          behavior: 'smooth',
          left: scrollToLeftWhenScrollEnd,
        });
      }
    };

    let prevContentRect: DOMRectReadOnly | null = null;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (prevContentRect != null && prevContentRect.width !== entries[0]?.contentRect.width) {
        requestAnimationFrame(() => {


            // コンテナの幅
  const cqw = (container?.getBoundingClientRect().width ?? 0) / 100;
  // コンテナの高さ
  const cqh = (container?.getBoundingClientRect().height ?? 0) / 100;

  // 1画面に表示できるページ数（1 or 2）
  const pageCountParView = (100 * cqw)/ (100 * cqh) < ((2 * IMAGE_WIDTH) / IMAGE_HEIGHT) ? 1 : 2;
  // ページの幅
  const pageWidth = ((100 * cqh) / IMAGE_HEIGHT) * IMAGE_WIDTH;

          scrollView?.scrollBy({
            behavior: 'instant',
            left: getScrollToLeft({ pageCountParView, pageWidth, scrollView }),
          });
        });
      }
      prevContentRect = entries[0]?.contentRect ?? null;
    };

    scrollView?.addEventListener('pointerdown', handlePointerDown, { passive: true, signal: abortController.signal });
    scrollView?.addEventListener('pointermove', handlePointerMove, { passive: true, signal: abortController.signal });
    scrollView?.addEventListener('pointerup', handlePointerUp, { passive: true, signal: abortController.signal });
    scrollView?.addEventListener('scroll', handleScroll, { passive: true, signal: abortController.signal });
    scrollView?.addEventListener('scrollend', handleScrollEnd, { passive: true, signal: abortController.signal });
    const resizeObserver = new ResizeObserver(handleResize);
    scrollView && resizeObserver.observe(scrollView);
    abortController.signal.addEventListener('abort', () => resizeObserver.disconnect(), { once: true });

    return () => {
      abortController.abort();
    };
  }, [scrollView]);


  return (
    <div className='ComicViewerCore___Container__styled' ref={containerRef}>
      <div ref={scrollViewRef} className='ComicViewerCore___Wrapper__styled'  >
        {renderingPages.map((page) => {
      return page ? <Suspense fallback={null}><ComicViewerPage key={page.id} pageImageId={page.image.id} /></Suspense>:null;
    }) }
      </div>
    </div>
  );
};

const ComicViewerCoreWithSuspense: React.FC<Props> = ({ episodeId, episode }) => {
  return (
      <ComicViewerCore episodeId={episodeId} episode={episode} />
  );
};

export { ComicViewerCoreWithSuspense as ComicViewerCore };

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';
const data = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. スクリプトタグを取得
    const injectDataScript = document.getElementById('inject-data');
  
    if (injectDataScript) {
      try {
        // 2. テキストコンテンツを取得し、JSONとしてパース
        const injectData = JSON.parse(injectDataScript.textContent || '{}');
        
        // 取得したデータを使用
        (window as any).injectData = injectData
        // 例: グローバルな状態管理にセットする
        // store.dispatch(setInitialData(injectData));
  
        // 例: Reactコンポーネントに渡す
        // ReactDOM.hydrate(<App initialData={injectData} />, document.getElementById('root'));
        
      } catch (error) {
        console.error('インジェクトデータのパース中にエラーが発生しました:', error);
      }
    } else {
      console.warn('インジェクトデータのスクリプトタグが見つかりませんでした。');
    }
  });
}

const main = async () => {
  await data();
  await registerServiceWorker();
  try {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        console.error('Root element not found');
        return;
      }
      const injectDataScript =  document.getElementById('inject-data');
      const injectData = JSON.parse(injectDataScript?.textContent || '{}') as Record<string, string>;
      ReactDOM.hydrateRoot(
        rootElement,
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false, fallback: injectData }}>
          <BrowserRouter>
            <ClientApp />
          </BrowserRouter>
        </SWRConfig>,
      );
  } catch (error) {
    console.error(error);
  }
};
main();

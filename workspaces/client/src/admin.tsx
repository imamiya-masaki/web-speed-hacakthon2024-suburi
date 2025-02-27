import ReactDOM from 'react-dom/client';
import { AdminApp } from '@wsh-2024/admin/src/index';
import { registerServiceWorker } from './utils/registerServiceWorker';
// const data = async () => {
//   document.addEventListener('DOMContentLoaded', () => {
//     // 1. スクリプトタグを取得
//     const injectDataScript = document.getElementById('inject-data');
  
//     if (injectDataScript) {
//       try {
//         // 2. テキストコンテンツを取得し、JSONとしてパース
//         const injectData = JSON.parse(injectDataScript.textContent || '{}');
        
//         // 取得したデータを使用
//         console.log('Injected Data:', injectData);
//         (window as any).injectData = injectData
//         // 例: グローバルな状態管理にセットする
//         // store.dispatch(setInitialData(injectData));
  
//         // 例: Reactコンポーネントに渡す
//         // ReactDOM.hydrate(<App initialData={injectData} />, document.getElementById('root'));
        
//       } catch (error) {
//         console.error('インジェクトデータのパース中にエラーが発生しました:', error);
//       }
//     } else {
//       console.warn('インジェクトデータのスクリプトタグが見つかりませんでした。');
//     }
//   });
// }

const main = async () => {
  // await data();
  await registerServiceWorker();
  try {
      const rootElement = document.getElementById('root');
      if (!rootElement) {
        console.error('Root element not found');
        return;
      }
    if (window.location.pathname.startsWith('/admin')) {
      ReactDOM.createRoot(rootElement).render(<AdminApp />);
    }
  } catch (error) {
    console.error(error);
  }
};
main();

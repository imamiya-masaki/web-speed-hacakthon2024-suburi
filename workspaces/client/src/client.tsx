import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { ClientApp } from '@wsh-2024/app/src/index';

import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
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
          </SWRConfig>
      );
  } catch (error) {
    console.error(error);
  }
};
main();

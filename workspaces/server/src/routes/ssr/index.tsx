import fs from 'fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import jsesc from 'jsesc';
import moment from 'moment-timezone';
import { renderToReadableStream } from 'react-dom/server.browser';
import { StaticRouter } from 'react-router-dom/server';
import { unstable_serialize } from 'swr';

import { featureApiClient } from '@wsh-2024/app/src/features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '@wsh-2024/app/src/features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '@wsh-2024/app/src/features/release/apiClient/releaseApiClient';
import { ClientApp } from '@wsh-2024/app/src/index';
import { getDayOfWeekStr } from '@wsh-2024/app/src/lib/date/getDayOfWeekStr';

import { HEADER_HTML_PATH } from '../../constants/paths';

const app = new Hono();

async function createInjectDataStr(): Promise<Record<string, unknown>> {
  const json: Record<string, unknown> = {};
  console.log('releases:start', performance.now())
  {
    const dayOfWeek = getDayOfWeekStr(moment());
    const releases = await releaseApiClient.fetch({ params: { dayOfWeek } });
    json[unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } }))] = releases;
  }
  console.log('releases:end', performance.now())
  console.log('feature:start', performance.now())
  {
    const features = await featureApiClient.fetchList({ query: {} });
    json[unstable_serialize(featureApiClient.fetchList$$key({ query: {} }))] = features;
  }
  console.log('feature:end', performance.now())
  console.log('ranking:start', performance.now())
  {
    const ranking = await rankingApiClient.fetchList({ query: {} });
    json[unstable_serialize(rankingApiClient.fetchList$$key({ query: {} }))] = ranking;
  }
  console.log('ranking:end', performance.now())

  return json;
}

const createHeaderHTML = async({
  injectData}: {
    injectData: Record<string, unknown>;
  }) => {
    let htmlContent: string = "";
  try {
   htmlContent = await fs.readFile(HEADER_HTML_PATH, 'utf-8');
  } catch (e) {
    console.log('createHTML:error', e)
  }
  const content = htmlContent
    // .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll(
      '<script id="inject-data" type="application/json"></script>',
      `<script id="inject-data" type="application/json">
        ${jsesc(injectData, {
          isScriptContext: true,
          json: true,
          minimal: true,
        })}
      </script>`,
    );
  return content;
}

app.get('*', async (c) => {
  console.log('SSR')
  console.log('start', performance.now())
  const injectData = await createInjectDataStr();
  const header = await createHeaderHTML({injectData})
  console.log('mergin', performance.now())
  try {
    const stream = await renderToReadableStream(
      <html >
        <head dangerouslySetInnerHTML={{ __html: header }}/>
        <body>
          <div id="root">
          <StaticRouter location={c.req.path}>
            <ClientApp />
          </StaticRouter>,
          </div>
          </body>
        </html>,
    );

    console.log('end', performance.now())
    return new Response(stream, {
      headers: { 'content-type': 'text/html' },
    });
  } catch (cause) {
    // console.log({cause})
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    // sheet.seal();
  }
});

export { app as ssrApp };

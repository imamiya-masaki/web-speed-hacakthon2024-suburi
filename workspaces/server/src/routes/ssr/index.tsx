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

import { HEADER_HTML_PATH, INDEX_HTML_PATH } from '../../constants/paths';
import { ServerStyleSheet } from 'styled-components';

const app = new Hono();

async function createInjectDataStr(): Promise<Record<string, unknown>> {
  const json: Record<string, unknown> = {};

  {
    const dayOfWeek = getDayOfWeekStr(moment());
    const releases = await releaseApiClient.fetch({ params: { dayOfWeek } });
    json[unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } }))] = releases;
  }

  {
    const features = await featureApiClient.fetchList({ query: {} });
    json[unstable_serialize(featureApiClient.fetchList$$key({ query: {} }))] = features;
  }

  {
    const ranking = await rankingApiClient.fetchList({ query: {} });
    json[unstable_serialize(rankingApiClient.fetchList$$key({ query: {} }))] = ranking;
  }

  return json;
}
async function createHTML({
  // body,
  injectData,
  styleTags,
}: {
  // body: string;
  injectData: Record<string, unknown>;
  styleTags: string;
}): Promise<string> {
  let htmlContent: string = "";
  try {
   htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  } catch (e) {
    console.log('createHTML:error', e)
  }
  console.log('htmlContent:end')
  const content = htmlContent
    // .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags)
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
    console.log('content:end')
  return content;
}

const createHeaderHTML = async({
  injectData,
  styleTags}: {
    injectData: Record<string, unknown>;
    styleTags: string;
  }) => {
    let htmlContent: string = "";
  try {
   htmlContent = await fs.readFile(HEADER_HTML_PATH, 'utf-8');
  } catch (e) {
    console.log('createHTML:error', e)
  }
  const content = htmlContent
    // .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags)
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
    console.log('content:end')
  return content;
}

app.get('*', async (c,next) => {
  const injectData = await createInjectDataStr();
  const sheet = new ServerStyleSheet();
  const styleTags = sheet.getStyleTags();
  const header = await createHeaderHTML({injectData, styleTags})
  console.log({header})
  const body = sheet.collectStyles(
    <StaticRouter location={c.req.path}>
      <ClientApp />
    </StaticRouter>,
  )
  try {
    const stream = await renderToReadableStream(
      <html >
        <head dangerouslySetInnerHTML={{ __html: header }}/>
        <body>
          <div id="root">
            {body}
          </div>
          </body>
        </html>,
    );

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

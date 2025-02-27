import fs from 'fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import jsesc from 'jsesc';
// import moment from 'moment-timezone';
import { renderToReadableStream } from 'react-dom/server.browser';
// import { StaticRouter } from 'react-router-dom/server';
import {join as pathJoin} from 'path';
import { featureApiClient } from '@wsh-2024/app/src/features/feature/apiClient/featureApiClient';
import { rankingApiClient } from '@wsh-2024/app/src/features/ranking/apiClient/rankingApiClient';
import { releaseApiClient } from '@wsh-2024/app/src/features/release/apiClient/releaseApiClient';
// import { ClientApp } from '@wsh-2024/app/src/index';
import { getDayOfWeekStr } from '@wsh-2024/app/src/lib/date/getDayOfWeekStr';
import { StaticRouter } from 'react-router-dom/server';
import { ClientApp } from '@wsh-2024/app/src/index';

import { HEADER_HTML_PATH, CLIENT_STATIC_PATH } from '../../constants/paths';
import { unstable_serialize } from 'swr';
import { CoverSection } from '@wsh-2024/app/src/pages/TopPage/internal/CoverSection';
import { CLIENT_PUBLIC_FILES_PATH } from 'next/dist/shared/lib/constants';
import { bookApiClient } from '@wsh-2024/app/src/features/book/apiClient/bookApiClient';
import { episodeApiClient } from '@wsh-2024/app/src/features/episode/apiClient/episodeApiClient';
import { authorApiClient } from '@wsh-2024/app/src/features/author/apiClient/authorApiClient';

const app = new Hono();

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
  let content = htmlContent
    // .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll(
      '<script id="inject-data" type="application/json"></script>',
      `<script id="inject-data" type="application/json">
        ${jsesc(injectData, {
          isScriptContext: true,
          json: true,
          minimal: true,
        })}
      </script>`
    );

  // cssインライン化

  // <link href="/assets/css/heroimage.css" rel="stylesheet" />
  // <link href="/assets/css/reset.css" rel="stylesheet" />
  // <link href="/client.css" rel="stylesheet">
  const resetCSS = await fs.readFile(pathJoin(CLIENT_STATIC_PATH, './assets/css/reset.css'), 'utf-8')
  const clientCSS = await fs.readFile(pathJoin(CLIENT_STATIC_PATH, './client.css'), 'utf-8')
   content = content.replaceAll(
    '<link href="/assets/css/reset.css" rel="stylesheet" />',
    `<style>${resetCSS}</style>`
   ).replaceAll('<link href="/client.css" rel="stylesheet" />', `<style>${clientCSS}</style>`);

  return content;
}

app.get('/', async (c) => {
  console.log('SSR')
  console.log('start', performance.now())
  const injectData = await createInjectDataTopStr();
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
          </StaticRouter>
          </div>
          </body>
        </html>
    );

    console.log('end', performance.now())
    return new Response(stream, {
      headers: { 'content-type': 'text/html',
        'Link': '<https://webspeed.anpanpass.com/client.global.js>; rel=preload; as=script',
        'Cache-Control': 'no-store'
       },
    });
  } catch (cause) {
    // console.log({cause})
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    // sheet.seal();
  }
});

app.get('/books/:bookId/episodes/:episodeId', async(c) => {
  const bookId = c.req.param('bookId')
  const episodeId = c.req.param('episodeId')
  console.log('SSR')
  console.log('start', performance.now())
  const injectData = await createInjectDataEpisodeStr(bookId, episodeId);
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
          </StaticRouter>
          </div>
          </body>
        </html>
    );

    console.log('end', performance.now())
    return new Response(stream, {
      headers: { 'content-type': 'text/html',
        'Link': '<https://webspeed.anpanpass.com/client.global.js>; rel=preload; as=script',
        'Cache-Control': 'no-store'
       },
    });
  } catch (cause) {
    // console.log({cause})
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    // sheet.seal();
  }
});

app.get('/books/:bookId', async(c) => {
  const bookId = c.req.param('bookId')
  console.log('SSR')
  console.log('start', performance.now())
  const injectData = await createInjectDataBookStr(bookId);
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
          </StaticRouter>
          </div>
          </body>
        </html>
    );

    console.log('end', performance.now())
    return new Response(stream, {
      headers: { 'content-type': 'text/html',
        'Link': '<https://webspeed.anpanpass.com/client.global.js>; rel=preload; as=script',
        'Cache-Control': 'no-store'
       },
    });
  } catch (cause) {
    // console.log({cause})
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    // sheet.seal();
  }
});

app.get('/authors/:authorId', async(c) => {
  const authorId = c.req.param('authorId')
  console.log('SSR')
  console.log('start', performance.now())
  const injectData = await createInjectDataAuthorStr(authorId);
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
          </StaticRouter>
          </div>
          </body>
        </html>
    );

    console.log('end', performance.now())
    return new Response(stream, {
      headers: { 'content-type': 'text/html',
        'Link': '<https://webspeed.anpanpass.com/client.global.js>; rel=preload; as=script',
        'Cache-Control': 'no-store'
       },
    });
  } catch (cause) {
    // console.log({cause})
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    // sheet.seal();
  }
});


app.get('*', async (c) => {
  const header = await createHeaderHTML({injectData:{}})
  try {
    const stream = await renderToReadableStream(
      <html >
        <head dangerouslySetInnerHTML={{ __html: header }}/>
        <body>
          <div id="root">
          <StaticRouter location={c.req.path}>
            <ClientApp />
          </StaticRouter>
          </div>
          </body>
        </html>
    );

    console.log('end', performance.now())
    return new Response(stream, {
      headers: { 'content-type': 'text/html',
        'Link': '<https://webspeed.anpanpass.com/client.global.js>; rel=preload; as=script',
        'Cache-Control': 'no-store'
       },
    });
  } catch (cause) {
    // console.log({cause})
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    // sheet.seal();
  }
});

export { app as ssrApp };
  // c.res.headers.append('Cache-Control', 'no-store');

  async function createInjectDataTopStr(): Promise<Record<string, unknown>> {
    const json: Record<string, unknown> = {};
  
    {
      const dayOfWeek = getDayOfWeekStr();
      const releases = await releaseApiClient.fetch({ params: { dayOfWeek } });
      json[unstable_serialize(releaseApiClient.fetch$$key({ params: { dayOfWeek } }))] = {...releases};
    }
  
    {
      const features = await featureApiClient.fetchList({ query: {} });
      json[unstable_serialize(featureApiClient.fetchList$$key({ query: {} }))] = [...features];
    }
  
    {
      const ranking = await rankingApiClient.fetchList({ query: {} });
      json[unstable_serialize(rankingApiClient.fetchList$$key({ query: {} }))] = [...ranking];
    }
  
    return json;
  }

  async function createInjectDataEpisodeStr(bookId: string, episodeId: string): Promise<Record<string, unknown>> {
    const json: Record<string, unknown> = {};
    {
      const episodeList = await episodeApiClient.fetchList({ query: {bookId} });
      json[unstable_serialize(episodeApiClient.fetchList$$key({ query: {bookId} }))] = episodeList;
    }
    {
      const episode = await episodeApiClient.fetch({ params: {episodeId} });
      json[unstable_serialize(episodeApiClient.fetch$$key({ params: {episodeId} }))] = episode;
    }
    return json;
  }

  async function createInjectDataBookStr(bookId: string): Promise<Record<string, unknown>> {
    const json: Record<string, unknown> = {};
    {
      const book = await bookApiClient.fetch({ params: { bookId } });
      json[unstable_serialize(bookApiClient.fetch$$key({ params: { bookId } }))] = book;
    }
    {
      const episode = await episodeApiClient.fetchList({ query: {bookId} });
      json[unstable_serialize(episodeApiClient.fetchList$$key({ query: {bookId} }))] = episode;
    }
    return json;

  }
  

  async function createInjectDataAuthorStr(authorId: string): Promise<Record<string, unknown>> {
    const json: Record<string, unknown> = {};
    {
      const author = await authorApiClient.fetch({ params: { authorId } });
      json[unstable_serialize(authorApiClient.fetch$$key({ params: { authorId } }))] = author;
    }
    return json;

  }
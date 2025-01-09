import fs from 'node:fs';
import path from 'node:path';

import { pnpmWorkspaceRoot as findWorkspaceDir } from '@node-kit/pnpm-workspace-root';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import findPackageDir from 'pkg-dir';
import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const WORKSPACE_DIR = (await findWorkspaceDir(process.cwd()))!;

  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  const SEED_IMAGE_DIR = path.resolve(WORKSPACE_DIR, './workspaces/server/seeds/images');
  const IMAGE_PATH_LIST = fs.readdirSync(SEED_IMAGE_DIR).map((file) => `/images/${file}`);
  console.log(`process.env['NODE_ENV']`, process.env['NODE_ENV'])

  return [
    {
      bundle: true,
      entry: {
        client: path.resolve(PACKAGE_DIR, './src/client.tsx'),
        serviceworker: path.resolve(PACKAGE_DIR, './src/serviceworker/index.ts'),
      },
      env: {
        API_URL: '',
        NODE_ENV: process.env['NODE_ENV'] || 'development',
        PATH_LIST: IMAGE_PATH_LIST.join(',') || '',
      },
      esbuildOptions(options) {
        options.drop = ['debugger'];
        options.define = {
          ...options.define,
          global: 'globalThis',
        };
        options.publicPath = '/';
      },
      esbuildPlugins: [
      ],
      format: 'iife',
      loader: {
        '.json?file': 'file',
        '.wasm': 'binary',
      },
      metafile: true,
      minify: process.env['NODE_ENV'] === "production",
      outDir: OUTPUT_DIR,
      platform: 'browser',
      shims: true,
      target: ['es2022'],
      treeshake: true,
    },
    {
      bundle: true,
      entry: {
        admin: path.resolve(PACKAGE_DIR, './src/admin.tsx'),
      },
      env: {
        API_URL: '',
        NODE_ENV: process.env['NODE_ENV'] || 'development',
        PATH_LIST: IMAGE_PATH_LIST.join(',') || '',
      },
      esbuildOptions(options) {
        options.drop = ['debugger'];
        options.define = {
          ...options.define,
          global: 'globalThis',
        };
        options.publicPath = '/';
      },
      esbuildPlugins: [
        polyfillNode({
          polyfills: {
            events: true,
            fs: true,
            path: true,
          },
        }) as any,
      ],
      format: 'iife',
      loader: {
        '.json?file': 'file',
        '.wasm': 'binary',
      },
      metafile: true,
      minify: process.env['NODE_ENV'] === "production",
      outDir: OUTPUT_DIR,
      platform: 'browser',
      shims: true,
      target: ['es2022'],
      treeshake: true,
    },
  ];
});

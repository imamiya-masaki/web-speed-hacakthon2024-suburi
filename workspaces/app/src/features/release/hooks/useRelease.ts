
import useSWR, { unstable_serialize } from 'swr';

import { releaseApiClient } from '../apiClient/releaseApiClient';

export function useRelease(...[options]: Parameters<typeof releaseApiClient.fetch>) {
  const key = unstable_serialize(releaseApiClient.fetch$$key(options)) as any;
  return useSWR(key, releaseApiClient.fetch);
}

import useSWR, {unstable_serialize} from 'swr';

import { rankingApiClient } from '../apiClient/rankingApiClient';

export function useRankingList(...[options]: Parameters<typeof rankingApiClient.fetchList>) {
  const key = unstable_serialize(rankingApiClient.fetchList$$key(options)) as any
  return useSWR(key, () => {}) as {data: any};
}
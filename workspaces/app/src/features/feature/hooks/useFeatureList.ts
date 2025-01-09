import useSWR, { unstable_serialize } from 'swr';

import { featureApiClient } from '../apiClient/featureApiClient';

export function useFeatureList(...[options]: Parameters<typeof featureApiClient.fetchList>) {
  const key = unstable_serialize(featureApiClient.fetchList$$key(options)) as any
  return useSWR(key, () => {}) as {data: any};
}

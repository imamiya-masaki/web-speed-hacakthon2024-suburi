import useSWR from 'swr';

import { episodeApiClient } from '../apiClient/episodeApiClient';

export function useEpisode(...[options]: Parameters<typeof episodeApiClient.fetch>) {
  return useSWR(episodeApiClient.fetch$$key(options), episodeApiClient.fetch, { suspense: true, fallbackData: {
    id: "",
    name: "",
    nameRuby: "",
    description: "",
    chapter: 0,
    book: {
      "author": {
        "id": "",
        "name": "",
        "description": "",
        "image": {
          "alt": "",
          "id": ""
        }
      },
      "description": "",
      "id": "",
      "image": {
        "alt": "",
        "id": ""
      },
      "name": "",
      "nameRuby": "",
    },
    "image": {
      "alt": "",
      "id": ""
    },
    "pages": []
  } });
}

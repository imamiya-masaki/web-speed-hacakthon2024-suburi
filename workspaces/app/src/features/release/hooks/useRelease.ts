import { useEffect } from 'react';

export function useRelease() {
  let data: any  = {
    "id": "",
    "dayOfWeek": "",
    "books": []
  };
  useEffect(() => {
    data = (window as any).injectData.releases
    console.log('data', data)
  },[])
  return data;
}

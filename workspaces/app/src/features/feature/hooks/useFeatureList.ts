import { useEffect } from 'react';

export function useFeatureList() {
  let data: any[] = []
  useEffect(() => {
    data = (window as any).injectData.features
  },[])
  return data;
}

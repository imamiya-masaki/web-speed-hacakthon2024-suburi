import { useEffect } from 'react';

export function useRankingList() { 
  let data: any[]  = [];
  useEffect(() => {
    data = (window as any).injectData.ranking
  },[])
  return data;
}

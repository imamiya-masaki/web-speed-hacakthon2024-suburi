import { useEffect } from 'react';
import { Dialog } from './foundation/components/Dialog';
import { Router } from './routes';


export const ClientApp: React.FC = () => {
  useEffect(()=> {
    const newrelic = (window as any).newrelic as any 
    if (newrelic && newrelic.setCustomAttribute) {
      // 物理的な画面サイズを送る場合
      newrelic.setCustomAttribute('performanceInfo', JSON.stringify({
        width: window.screen.width,
        height: window.screen.height,
        url: window.location.href
      }));
    }
  },[])
  return (
    <>
      <Dialog />
      <Router />
    </>
  );
};

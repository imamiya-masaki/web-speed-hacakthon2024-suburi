import './setup';

import { Dialog } from './foundation/components/Dialog';
import { GlobalStyle } from './foundation/styles/GlobalStyle';
import { Router } from './routes';
import { useEffect } from 'react';
import { UserActionObserver } from './logger';

export const ClientApp: React.FC = () => {

  return (
    <>
      <GlobalStyle />
      <Dialog />
      <Router />
    </>
  );
};

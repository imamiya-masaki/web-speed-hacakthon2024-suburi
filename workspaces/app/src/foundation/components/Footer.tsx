import './Footer.module.css'

import React, { Suspense, lazy } from 'react';

import { Color, Space } from '../styles/variables';

import { Box } from './Box';
import { Flex } from './Flex';
import { Button } from './Button';

const FooterButtonContent = lazy(() => import('./FooterButtonContent'));

export const Footer: React.FC = () => {

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" height={45}/>
        <Suspense fallback={<Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <Button className='Footer___Button__styled' disabled>
            利用規約
          </Button>
          <Button className='Footer___Button__styled' disabled>
            お問い合わせ
          </Button>
          <Button className='Footer___Button__styled' disabled>
            Q&A
          </Button>
          <Button className='Footer___Button__styled' disabled>
            運営会社
          </Button>
          <Button className='Footer___Button__styled' disabled>
            Cyber TOONとは
          </Button>
        </Flex>}>
          <FooterButtonContent />   
        </Suspense>
      </Flex>
    </Box>
  );
};

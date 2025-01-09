import { Outlet } from 'react-router-dom';
import './ActionLayout.module.css'


import { Box } from '../components/Box';
import { Container } from '../components/Container';
import { Flex } from '../components/Flex';
import { Footer } from '../components/Footer';
import { Space } from '../styles/variables';

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export const ActionLayout: React.FC<Props> = ({ leftContent, rightContent }) => {

  
  return (
    <Container>
      <header className='ActionLayout___Header__styled'>
        <Flex align="center" justify="space-between">
          {leftContent}
          {rightContent}
        </Flex>
      </header>

      <Box as="main" height="100%" py={Space * 2}>
        <Outlet />
      </Box>

      <Footer />
    </Container>
  );
};

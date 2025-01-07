import { Outlet } from 'react-router-dom';

import './CommonLayout.module.css';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';

export const CommonLayout: React.FC = () => {
  return (
    <Container>
      <div className='CommonLayout___Content__styled'>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

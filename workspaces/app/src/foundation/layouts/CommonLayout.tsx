import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import './CommonLayout.module.css';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { Space } from '../styles/variables';

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

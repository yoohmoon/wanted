import React from 'react';
import Nav from '../Nav/Nav';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { styled } from 'styled-components';

const MainLayout = () => {
  return (
    <>
      <Nav />
      <Wrapper>
        <Outlet />
      </Wrapper>

      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  margin: 0 226px;
`;

export default MainLayout;
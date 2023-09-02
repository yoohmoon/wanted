import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { useRecoilState } from 'recoil';
import { modalState } from '../../store/modalState';
import Modal from './ModalComponents/Modal';

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  return (
    <Container>
      <Nav />
      <Wrapper>
        <Outlet />
      </Wrapper>
      {/* <Footer /> */}
      {isModalOpen && <Modal />}
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  /* margin: 0 226px; */
  margin: 0 calc(100vw * 0.1494709);
  padding-top: 50px;
`;

export default MainLayout;

import React, { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { loginStepState } from '../../../store/loginStepState';

type HeaderProps = {
  children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const setStep = useSetRecoilState(loginStepState);

  // 재사용성 고려 - 이메일로 로그인
  return (
    <Container>
      <PrevBtn
        type='button'
        onClick={() => {
          setStep('emailInput');
        }}
      >
        취소
      </PrevBtn>
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 340px;
  height: 64px;
  margin-top: -20px;
  margin-bottom: 20px;
  font-size: 18px;
  background-color: #fff;
`;

const PrevBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 17px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontSb};
  flex: 1;
`;

export default Header;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';
import Logo from './components/Logo';

const Nav = () => {
  const [clickedNav, setClickedNav] = useState<number | null>(null);
  const handleNavClick = (id: number) => {
    setClickedNav(id);
  };

  return (
    <Container>
      <NavBox>
        <LogoWrapper>
          <FontAwesomeIcon icon={faBars} />
          <Link to='/'>
            <div>
              <Logo />
            </div>
          </Link>
        </LogoWrapper>
        <nav>
          <NavList>
            {NAV_ITEMS.map((item) => (
              <Link key={item.id} to={item.url}>
                <NavItemContainer
                  onClick={() => handleNavClick(item.id)}
                  clicked={item.id === clickedNav}
                >
                  <li>{item.title}</li>
                </NavItemContainer>
              </Link>
            ))}
          </NavList>
        </nav>
        <IconWrap>
          <li>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </li>
          <Link to='/login'>
            <SignIn>회원가입/로그인</SignIn>
          </Link>
          <Separator />
          <CorporateBtn>기업 서비스</CorporateBtn>
        </IconWrap>
      </NavBox>
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderGray};
  height: 50px;
  line-height: 50px;
  font-size: 14px;
`;

const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 226px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;

  div {
    padding-bottom: 3px;
  }
`;
const NavList = styled.div`
  display: flex;
  gap: 30px;
  font-family: 'PretendardVariable';
  cursor: pointer;
`;

const NavItemContainer = styled.div<{ clicked: boolean }>`
  box-shadow: ${(props) =>
    props.clicked && `inset 0 -2.5px 0 ${props.theme.mainBlue}`};

  &:hover {
    box-shadow: ${(props) =>
      props.clicked
        ? `inset 0 -2.5px 0 ${props.theme.mainBlue}`
        : `inset 0 -2.5px 0 ${props.theme.borderGray}`};
  }
`;

const IconWrap = styled.ul`
  display: flex;
  align-items: center;
  gap: 15px;

  li {
    cursor: pointer;
  }
`;

const SignIn = styled.li`
  font-family: 'PretendardVariable';
  font-weight: 600;
`;

const Separator = styled.li`
  width: 1px;
  height: 10px;
  background-color: ${(props) => props.theme.borderGray};
`;

const CorporateBtn = styled.li`
  height: 100%;
  padding: 0 10px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.borderGray};
  line-height: 30px;
  font-size: 13px;
  color: #666;
`;

export default Nav;

const NAV_ITEMS = [
  { id: 1, title: '채용', url: '/' },
  { id: 2, title: '이벤트', url: '/' },
  { id: 3, title: '이력서', url: '/' },
  { id: 4, title: '소셜', url: '/' },
  { id: 5, title: '프리랜서', url: '/' },
  { id: 6, title: 'AI 합격 예측', url: '/' },
];

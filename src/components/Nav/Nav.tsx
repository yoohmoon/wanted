import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';
import Logo from './components/Logo';

const Nav = () => {
  const [clickedNav, setClickedNav] = useState<number | null>(null);
  const handleNavClick = (id: number) => {
    setClickedNav(id);
  };

  // 🙋‍♀️ 이렇게만 토큰 유무 확인하면 되나요??
  const token = localStorage.getItem('token'); // 토큰 키 값 확인 필요
  // const token = false;
  // const token = true;

  return (
    <Container>
      <NavBox>
        <LogoWrapper>
          <FontAwesomeIcon icon={faBars} stroke='' size='lg' />
          <Link to='/'>
            <div>
              <Logo />
            </div>
          </Link>
        </LogoWrapper>
        <ResponsiveWrap>
          <NavListWrap>
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
          </NavListWrap>
          <IconWrap>
            <li>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size='lg'
                style={{ color: '#828181' }}
              />
            </li>
            {token ? (
              <TokenUI>
                {/* <FontAwesomeIcon
                  icon='fa-regular fa-bell'
                  size='xl'
                  style={{ color: '#8c9bb5' }}
                /> */}
                <FontAwesomeIcon icon={faBell} size='lg' />
                <AvatarWrap>
                  <Avatar></Avatar>
                </AvatarWrap>
              </TokenUI>
            ) : (
              <Link to='/login'>
                <SignIn>회원가입/로그인</SignIn>
              </Link>
            )}

            <Separator />
            <CorporateBtn>기업 서비스</CorporateBtn>
          </IconWrap>
        </ResponsiveWrap>
      </NavBox>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
  border-bottom: 1px solid ${(props) => props.theme.borderGray};
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  font-size: 14px;

  @media screen and (min-width: 768px) and (max-width: 1046px) {
    /* width: 90%; */
    height: 110px;
  }
`;

const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 0 226px; */
  margin: 0 calc(100vw * 0.1494709);

  @media screen and (min-width: 768px) and (max-width: 1046px) {
    /* display: block; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }
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

const ResponsiveWrap = styled.div`
  /* width: 100%; */
  display: flex;
  /* gap: 170px; */
  gap: calc(100vw * 0.1);
  /* gap: 11vw; */
  justify-content: flex-end;

  @media screen and (min-width: 768px) and (max-width: 1046px) {
    /* flex-wrap: wrap; */
    /* display: inline-block;
    width: 60%; */
  }
`;

const NavListWrap = styled.nav`
  //
  @media screen and (min-width: 768px) and (max-width: 1046px) {
    /* display: inline-block;
    width: 60%; */
  }
`;

const NavList = styled.div`
  display: flex;
  gap: 30px;
  font-family: 'PretendardVariable';
  font-weight: 600;
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
  /* height: 100%; */
  /* padding: 1px 0; */

  li {
    cursor: pointer;
  }

  @media screen and (min-width: 768px) and (max-width: 1046px) {
    /* flex-wrap: wrap; */
    /* display: inline-block;
    width: 30%; */
  }
`;

const TokenUI = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AvatarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.borderGray};
  overflow: hidden;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png),
    url(https://static.wanted.co.kr/images/profile_default.png);
  background-size: cover;
  background-repeat: no-repeat;
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
  /* height: 100%; */
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

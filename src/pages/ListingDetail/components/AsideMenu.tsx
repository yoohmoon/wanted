import React from 'react';
import styled from 'styled-components';
import SubmitBtn from '../../Login/components/SubmitBtn';
import ShareSvg from './ShareSvg';
import BookmarkSvg from './BookmarkSvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProfileIcon from '../../../components/User/ProfileIcon';

type AsideMenuProps = {
  likeNum: number;
  applicantReward: number;
  recommenderReward: number;
};

const AsideMenu = ({
  likeNum,
  applicantReward,
  recommenderReward,
}: AsideMenuProps) => {
  return (
    <Container>
      <ShareBtnContainer>
        <ShareSvg />
      </ShareBtnContainer>
      <div>
        <Title>채용보상금</Title>
        <RewardList>
          <li>
            <h4>추천인</h4>
            <p>{recommenderReward}원</p>
          </li>
          <li>
            <h4>지원자</h4>
            <p>{applicantReward}원</p>
          </li>
        </RewardList>
      </div>
      <SubmitBtn disabledCon={false} reverse={true}>
        <div>
          <BookmarkSvg />
          <span>북마크하기</span>
        </div>
      </SubmitBtn>
      <SubmitBtn
        title='지원하기'
        disabledCon={false}
        isApply={true}
      ></SubmitBtn>
      <LikeBtnWrap>
        <LikeButton>
          <FontAwesomeIcon icon={faHeart} style={{ color: '#eee' }} />
          <span>{likeNum}</span>
        </LikeButton>
        <LikedUsersButton>
          {likeNum === 0 || !likeNum ? (
            ''
          ) : likeNum === 1 ? (
            <ProfileIcon isLiked={true} />
          ) : likeNum === 2 ? (
            <LikedUsersWrap>
              <FirstIconWrapper>
                <ProfileIcon isLiked={true} />
              </FirstIconWrapper>
              <IconWrapper>
                <ProfileIcon isLiked={true} />
              </IconWrapper>
            </LikedUsersWrap>
          ) : (
            <LikedUsersWrap>
              <FirstIconWrapper>
                <ProfileIcon isLiked={true} />
              </FirstIconWrapper>
              <IconWrapper>
                <ProfileIcon isLiked={true} />
              </IconWrapper>
              <LastIconWrapper>
                <ProfileIcon isLiked={true} />
              </LastIconWrapper>
            </LikedUsersWrap>
          )}
        </LikedUsersButton>
      </LikeBtnWrap>
    </Container>
  );
};

const Container = styled.aside`
  position: sticky;
  /* top: 20px; */
  top: 70px;
  width: 340px;

  padding: 24px 20px;
  border: 1px solid ${({ theme }) => theme.borderGray};
  border-radius: 3px;

  color: ${({ theme }) => theme.mainBlack};
  font-size: 15px;
`;

const ShareBtnContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.borderGray};
  cursor: pointer;
`;

const Title = styled.h2`
  font-weight: 600;
`;

const RewardList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;

  li {
    width: 50%;

    h4 {
      margin-bottom: 8px;
      color: ${({ theme }) => theme.textGray};
    }
  }
`;

const LikeBtnWrap = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LikeButton = styled.button`
  min-width: 48px;
  height: 32px;
  padding: 0 14px;
  border: ${({ theme }) => `1px solid ${theme.borderGray}`};
  border-radius: 20px;
  background-color: #fff;

  cursor: pointer;

  span {
    margin-left: 4px;
    font-weight: 600;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const LikedUsersButton = styled.button`
  flex-grow: 1;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const FirstIconWrapper = styled.div`
  z-index: 3;
`;

const IconWrapper = styled.div`
  margin-left: -12px;
  z-index: 2;
`;

const LastIconWrapper = styled(IconWrapper)`
  z-index: 1;
`;

const LikedUsersWrap = styled.div`
  display: flex;
  gap: 2px;
`;

/* 
// A new component based on Button, but with some override styles
// Button의 속성을 상속 받아 새로운 anchor 태그를 생성
const TomatoAnchorButton = styled(Button.withComponent("a"))`
  color: tomato;
  border-color: tomato;

*/

export default AsideMenu;

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { modalState } from '../../../store/modalState';
import { likeState } from '../../../store/likeState';
import styled from 'styled-components';
import SubmitBtn from '../../Login/components/SubmitBtn';
import ShareSvg from './ShareSvg';
import BookmarkSvg from './BookmarkSvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileIcon from '../../../components/User/ProfileIcon';
// 좋아요 아이콘
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../../config/config';

type AsideMenuProps = {
  likeNum: number;
  applicantReward: string;
  recommenderReward: string;
};

const AsideMenu = ({
  likeNum,
  applicantReward,
  recommenderReward,
}: AsideMenuProps) => {
  // 좋아요 여부 (기능) 상태 관리
  // 좋아요 api 호출
  const { id } = useParams();
  console.log('어사이드 메뉴에서의 id: ', id);

  const navigate = useNavigate();

  const [isLikeBtnClicked, setIsLikedBtnClicked] = useRecoilState(likeState);

  // 로그인 유무 확인을 통한 좋아요 기능 사용 가능 여부 판단
  const token = localStorage.getItem('token');

  // 좋아요 버튼 클릭 시 + 토큰 있을 경우, url에 useParams id가 있을 경우 호출되는 좋아요 상태 업데이트 함수
  const updateLikeStatus = async () => {
    try {
      // const requestBody = {
      //   employmentId: id,
      // };

      const response = await fetch(
        `${API_BASE_URL}api/v1/employment/${id}/likes`,
        {
          method: 'POST',
          // mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (data.isSuccess) {
        // if (response.ok && data.isSuccess) {
        console.log('좋아요 기능 성공 !!', data.message, data.code);
        return true;
      } else {
        console.log(data.message, data.code);
        console.error('좋아요 상태 업데이트 실패');
        return false;
      }
    } catch (error) {
      console.error('좋아요 상태 업데이트 에러', error);
      return false;
    }

    /*       if (data.isSuccess) {
        console.log('좋아요 기능 성공 !!', data.message, data.code);
      } else {
        console.log(data.message, data.code);

        console.error('좋아요 상태 업데이트 실패');
      }
    } catch (error) {
      console.error('좋아요 상태 업데이트 에러', error);
    } */
  };

  //좋아요 유무에 따라 아이콘 변경
  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  const handleLikeBtn = async () => {
    if (token) {
      if (id) {
        const isSuccess = await updateLikeStatus(); //좋아요 상태 업데이트 api 함수
        if (isSuccess) {
          setIsLikedBtnClicked(!isLikeBtnClicked);
        }
        // updateLikeStatus(); //좋아요 상태 업데이트 api 함수 호출
      }
    } else {
      navigate('/login');
    }
  };

  const setIsModalOpen = useSetRecoilState(modalState);

  const { lockScroll, openScroll } = useBodyScrollLock();

  const openModal = () => {
    lockScroll();
    setIsModalOpen(true);
  };

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
        <LikeButton onClick={handleLikeBtn}>
          <HeartIcon
            icon={heartMode[`${isLikeBtnClicked}`]}
            size='lg'
            isLikeBtnClicked={isLikeBtnClicked}
          />

          <span>{likeNum}</span>
        </LikeButton>
        <LikedUsersButton onClick={openModal}>
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

const HeartIcon = styled(FontAwesomeIcon)<{ isLikeBtnClicked: boolean }>`
  color: ${(props) => (props.isLikeBtnClicked ? '#fe415c' : '#ddd')};
`;

/* 
// A new component based on Button, but with some override styles
// Button의 속성을 상속 받아 새로운 anchor 태그를 생성
const TomatoAnchorButton = styled(Button.withComponent("a"))`
  color: tomato;
  border-color: tomato;

*/

export default AsideMenu;

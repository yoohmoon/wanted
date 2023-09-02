import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import ProfileIcon from '../../User/ProfileIcon';
import { UserType } from '../../../types/likedUsersType';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../../store/modalState';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';

const Modal = () => {
  const setIsModalOpen = useSetRecoilState(modalState);

  const [likedUsersData, setLikedUsersData] = useState<UserType[] | null>(null);
  const [likesSum, setLikesSum] = useState(0);

  const { lockScroll, openScroll } = useBodyScrollLock();

  const closeModal = () => {
    openScroll();
    setIsModalOpen(false);
  };

  useEffect(() => {
    // get api fetching
    const apiUrl = '/data/likedUsersData.json';
    // const apiUrl = `api/v1/employment/{employmentId}/likes`;  // ‼ 여기서 employmentId는 실제 id 값으로 대체해야 함
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLikedUsersData(data.result.likeModalResDto);
        setLikesSum(data.result.likesNum);
      })
      .catch((err) => {
        console.error('Error fetching data: ', err);
      });
  }, []);

  return (
    <ModalContainer>
      <ModalBox>
        <Header>
          <h5>이 포지션을 좋아한 사람들</h5>
          <CloseBtn>
            <FontAwesomeIcon icon={faX} onClick={closeModal} />
          </CloseBtn>
        </Header>
        <ModalContents>
          <ModalContentBox>
            <LikesNum>
              <span>{likesSum}명</span>이 좋아요
            </LikesNum>
            {/* {map 돌릴 영역!} */}
            {likedUsersData
              ? likedUsersData.map((user) => (
                  <LikedUser key={user.userId}>
                    <ProfileIcon isBig={true} />
                    <div>{user.userNames}</div>
                  </LikedUser>
                ))
              : null}
          </ModalContentBox>
        </ModalContents>
      </ModalBox>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  font-family: ${({ theme }) => theme.mainFont};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 50%);
`;

const ModalBox = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 5px;
  background-color: #ffffff;
`;

const Header = styled.div`
  position: relative;
  height: 54px;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
  text-align: center;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 13px;
  right: 15px;
  padding: 8px 10px;
  border: none;
  border-radius: 50%;

  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const ModalContents = styled.div`
  /* height: 100%; */
  /* height: 400px; */
`;
const ModalContentBox = styled.ul`
  max-height: 443px; //height를 설정하지 않으면 스크롤이 생기지 않음
  flex: 1 1;
  overflow-y: auto;
  /* overflow: hidden; */
`;

const LikesNum = styled.li`
  height: 54px;
  line-height: 54px;
  background-color: ${({ theme }) => theme.modalGray};
  padding: 1px 20px;
  color: ${({ theme }) => theme.modalText};
  font-size: 14px;

  span {
    font-weight: 600;
  }
`;

const LikedUser = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 77px;
  padding: 13px 20px;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
`;

export default Modal;

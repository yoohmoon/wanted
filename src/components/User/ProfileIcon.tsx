import React from 'react';
import { styled } from 'styled-components';

type ProfileIconProps = {
  isLiked?: boolean;
  isBig?: boolean;
};

const ProfileIcon = ({ isLiked = false, isBig = false }: ProfileIconProps) => {
  return (
    <>
      <AvatarWrap isLiked={isLiked} isBig={isBig}>
        <Avatar isBig={isBig} />
      </AvatarWrap>
    </>
  );
};

const AvatarWrap = styled.div<ProfileIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isBig }) => (isBig ? '48px' : '32px')};
  height: ${({ isBig }) => (isBig ? '48px' : '32px')};
  border-radius: 50%;
  border: ${({ theme, isLiked }) =>
    isLiked ? '2px solid #fff' : `0.5px solid ${theme.borderGray}`};
  overflow: hidden;
  cursor: pointer;
`;

const Avatar = styled.div<{ isBig: boolean }>`
  width: ${({ isBig }) => (isBig ? '100%' : '27px')};
  height: ${({ isBig }) => (isBig ? '100%' : '27px')};
  border-radius: 50%;
  background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png),
    url(https://static.wanted.co.kr/images/profile_default.png);
  background-size: cover;
  background-repeat: no-repeat;
`;

export default ProfileIcon;

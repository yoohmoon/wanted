import React from 'react';
import { styled } from 'styled-components';

type ProfileIconProps = {
  isLiked?: boolean;
};

const ProfileIcon = ({ isLiked = false }: ProfileIconProps) => {
  return (
    <>
      <AvatarWrap isLiked={isLiked}>
        <Avatar />
      </AvatarWrap>
    </>
  );
};

const AvatarWrap = styled.div<ProfileIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: ${({ theme, isLiked }) =>
    isLiked ? '2px solid #fff' : `0.5px solid ${theme.borderGray}`};
  overflow: hidden;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-image: url(https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png),
    url(https://static.wanted.co.kr/images/profile_default.png);
  background-size: cover;
  background-repeat: no-repeat;
`;

export default ProfileIcon;

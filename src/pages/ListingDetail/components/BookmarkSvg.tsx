import React from 'react';
import styled from 'styled-components';

const BookmarkSvg = () => {
  return (
    <SvgContainer
      width='13'
      height='17'
      viewBox='0 0 13 17'
      style={{ color: '#36f' }}
    >
      <defs>
        <path
          id='bookmarkIconLine'
          d='M1.481 1.481h9.382v10.727c0 .409.331.74.74.74.41 0 .741-.331.741-.74V.74c0-.41-.331-.741-.74-.741H.74C.33 0 0 .332 0 .74v14.814c0 .568.614.925 1.108.643l5.18-2.873 5.104 2.873c.355.203.807.08 1.01-.276.203-.355.08-.808-.275-1.01l-5.471-3.083c-.228-.13-.507-.13-.735 0l-4.44 2.45V1.48z'
        ></path>
      </defs>
      <g fill='none' fill-rule='evenodd'>
        <use fill='#36f'></use>
      </g>
    </SvgContainer>
  );
};

const SvgContainer = styled.svg`
  /* color: ${({ theme }) => theme.mainBlue}; */
`;

export default BookmarkSvg;

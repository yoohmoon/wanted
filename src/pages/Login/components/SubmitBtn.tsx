import React from 'react';
import { styled } from 'styled-components';

type SubmitBtnProps = {
  title?: string;
  children?: React.ReactNode;
  disabledCon: boolean;
  size?: 'small' | 'medium' | 'large';
  reverse?: boolean;
  isApply?: boolean;
};

const SubmitBtn: React.FC<SubmitBtnProps> = ({
  title,
  children,
  disabledCon,
  size = 'large',
  reverse = false,
  isApply = false,
}) => {
  return (
    <Button
      type='submit'
      disabled={disabledCon}
      size={size}
      reverse={reverse}
      isApply={isApply}
    >
      <span>
        {title}
        {children}
      </span>
    </Button>
  );
};

const Button = styled.button<{
  disabled: boolean;
  size: string;
  reverse: boolean;
  isApply: boolean;
}>`
  width: ${({ size }) => {
    if (size === 'medium') return '34.5%';
    if (size === 'large') return '100%';
    else return '20%';
  }};
  /* display: ${({ size }) => {
    if (size === 'medium') return 'inline-block';
    // if (size === 'large') return '100%';
    else return 'inline-block';
  }}; */

  /* width: 100%; */
  min-height: 50px;
  padding: 1px 6px;
  margin-top: ${({ size, reverse, isApply }) => {
    if (reverse || isApply) return '0px';

    if (size === 'medium') return '2px';
    else return '30px';
  }};
  /* margin-top: 30px; */
  margin-bottom: 10px;
  border-radius: ${({ size }) => {
    if (size === 'medium') return '5px';
    else return '25px';
  }};
  /* border-radius: 25px; */
  border: none;
  font-size: 16px;

  background-color: ${({ disabled, theme, reverse }) =>
    reverse ? '#fff' : disabled ? theme.disabledGray : theme.mainBlue};

  border: ${({ reverse, theme }) =>
    reverse ? `1px solid ${theme.mainBlue}` : 'none'};

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  span {
    color: ${({ disabled, reverse }) =>
      reverse ? '#36f' : disabled ? '#ccc' : '#fff'};
  }
`;

export default SubmitBtn;

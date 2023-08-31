import React from 'react';
import { styled } from 'styled-components';

type SubmitBtnProps = {
  title: string;
  disabledCon: boolean;
  size?: 'small' | 'medium' | 'large';
};

const SubmitBtn: React.FC<SubmitBtnProps> = ({
  title,
  disabledCon,
  size = 'large',
}) => {
  return (
    <Button type='submit' disabled={disabledCon} size={size}>
      <span>{title}</span>
    </Button>
  );
};

const Button = styled.button<{ disabled: boolean; size: string }>`
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
  margin-top: ${({ size }) => {
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

  background-color: ${({ disabled, theme }) =>
    disabled ? theme.disabledGray : theme.mainBlue};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  span {
    color: ${({ disabled }) => (disabled ? '#ccc' : '#fff')};
  }
`;

export default SubmitBtn;

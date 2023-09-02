import { styled } from 'styled-components';

interface HashTagProps {
  text: string;
  isTech?: boolean;
}

const HashTag = ({ text, isTech = false }: HashTagProps) => {
  return <Container isTech={isTech}>{text}</Container>;
};

const Container = styled.div<{ isTech: boolean }>`
  font-family: ${({ theme }) => theme.mainFont};
  display: inline-block;
  background-color: ${({ theme, isTech }) =>
    isTech ? theme.bgMint : theme.tagGray};
  padding: 9px 14px;
  margin-right: 6px;
  border-radius: 25px;
  font-size: 12px;
  cursor: pointer;

  margin-top: 5px;
  margin-bottom: 8px;
`;

export default HashTag;

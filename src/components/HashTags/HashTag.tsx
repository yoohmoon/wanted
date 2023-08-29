import { styled } from 'styled-components';

interface HashTagProps {
  text: string;
}

const HashTag = ({ text }: HashTagProps) => {
  return <Container>{text}</Container>;
};

const Container = styled.div`
  font-family: ${({ theme }) => theme.mainFont};
  display: inline-block;
  background-color: ${({ theme }) => theme.tagGray};
  padding: 9px 14px;
  margin-right: 6px;
  border-radius: 25px;
  font-size: 12px;
  cursor: pointer;
`;

export default HashTag;

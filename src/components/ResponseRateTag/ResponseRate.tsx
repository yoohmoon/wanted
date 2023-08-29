import { styled } from 'styled-components';

const ResponseRate = () => {
  return <Container>응답률 매우 높음</Container>;
};

const Container = styled.div`
  display: inline-flex;
  font-family: ${({ theme }) => theme.mainFont};
  height: 19px;
  line-height: 19px;
  padding: 0 5px;
  border: 1px solid ${({ theme }) => theme.mint};
  border-radius: 2px;
  color: ${({ theme }) => theme.mint};
  font-size: 10px;
`;

export default ResponseRate;

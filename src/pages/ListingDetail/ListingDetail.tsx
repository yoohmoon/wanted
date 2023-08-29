import React from 'react';
import { styled } from 'styled-components';
import ResponseRate from '../../components/ResponseRateTag/ResponseRate';
import HashTag from '../../components/HashTags/HashTag';

const ListingDetail = () => {
  return (
    <Container>
      <DetailMain>
        <article>
          {/* 컴포넌트화 하기! */}
          <section>
            <Carousel>
              <div>
                캐러셀
                <img src='' alt='' />
              </div>
            </Carousel>
          </section>
          <DetailTitleContainer>
            <JobTitle>QA 엔지니어</JobTitle>
            <DetailInfoWrap>
              <div>아이엠폼</div>
              <ResponseRate />
              <Separator />
              <AddressShort>서울.한국</AddressShort>
            </DetailInfoWrap>
            <ThemeTagsContainer>
              <HashTag text='hello' />
            </ThemeTagsContainer>
          </DetailTitleContainer>
          <section>
            <MainContent>회사 소개 메인글 </MainContent>
            <div>
              <TechStack>기술스택 ・ 툴</TechStack>
            </div>
          </section>
        </article>
        <aside></aside>
      </DetailMain>
    </Container>
  );
};

const Container = styled.div`
  font-family: ${({ theme }) => theme.mainFont};
  margin: 38px 0;
`;
const DetailMain = styled.main``;

const Carousel = styled.div``;

const DetailTitleContainer = styled.div`
  margin: 40px 0 30px;
`;
const JobTitle = styled.header`
  font-weight: 600;
  font-size: 22px;
`;

const DetailInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 14px;
`;

const Separator = styled.div`
  width: 1px;
  height: 13px;
  background-color: ${(props) => props.theme.borderGray};
`;

const AddressShort = styled.div`
  color: ${(props) => props.theme.textGray};
`;

const ThemeTagsContainer = styled.ul``;

const MainContent = styled.p``;
const TechStack = styled.h6`
  margin-top: 20px;
  font-weight: 600;
`;

export default ListingDetail;

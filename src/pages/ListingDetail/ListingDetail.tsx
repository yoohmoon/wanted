import React from 'react';
import { styled } from 'styled-components';
import ResponseRate from '../../components/ResponseRateTag/ResponseRate';
import HashTag from '../../components/HashTags/HashTag';
import useFetch from '../../hooks/useFetch';
import { JobDetailResponse } from '../../types/jobDetailType';

const ListingDetail = () => {
  const url = `/data/jobDetailData1.json`;
  const { loading, data, error } = useFetch<JobDetailResponse>(url);
  // console.log('hook? ', data?.result);
  const jobData = data?.result;
  // console.log('hook??? ', data?.result);

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
            <JobTitle>{jobData?.employmentTitle}</JobTitle>
            <DetailInfoWrap>
              <div>{jobData?.companyname}</div>
              <ResponseRate />
              <Separator />
              <AddressShort>{jobData?.addressShort}</AddressShort>
            </DetailInfoWrap>
            <ThemeTagsContainer>
              {jobData?.themeTags.map((theme) => (
                <HashTag text={theme.title} />
              ))}
            </ThemeTagsContainer>
          </DetailTitleContainer>
          <section>
            <MainContent>{jobData?.employmentContents} </MainContent>
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

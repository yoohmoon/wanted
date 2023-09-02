import React from 'react';
import { styled } from 'styled-components';
import ResponseRate from '../../components/ResponseRateTag/ResponseRate';
import HashTag from '../../components/HashTags/HashTag';
import useFetch from '../../hooks/useFetch';
import { JobDetailResponse } from '../../types/jobDetailType';
import AsideMenu from './components/AsideMenu';
import Carousel from './components/Carousel';

const ListingDetail = () => {
  const url = `/data/jobDetailData1.json`;
  const { loading, data, error } = useFetch<JobDetailResponse>(url);
  // console.log('hook? ', data?.result);
  const jobData = data?.result;
  console.log('hook??? ', data?.result);

  return (
    <Container>
      <DetailMain>
        <MainListingSection>
          <Carousel img={jobData?.imgUrls || []} />
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
          <DetailContentSection>
            <MainContent>{jobData?.employmentContents} </MainContent>
            <div>
              <TechStack>기술스택 ・ 툴</TechStack>
              {jobData?.tech.map((tag, index) => (
                <HashTag text={tag} isTech={true} key={index} />
              ))}
            </div>
          </DetailContentSection>
          <HorizontalLine />
          <LocationSection>
            <ul>
              <DetailedList>
                <ListTitle>마감일</ListTitle>
                <p>2023.09.10</p>
              </DetailedList>
              <DetailedList>
                <ListTitle>근무지역</ListTitle>
                <p>서울특별시 서초구 서초대로27길 54, 1층</p>
              </DetailedList>
            </ul>
          </LocationSection>
        </MainListingSection>
        <AsideMenu />
      </DetailMain>
    </Container>
  );
};

const Container = styled.div`
  font-family: ${({ theme }) => theme.mainFont};
  margin: 38px 0;
`;
const DetailMain = styled.main`
  display: flex;
  align-items: flex-start; // stetch 방지
  /* display: inline-block; */
  width: 100%;
  max-width: 1060px; // 이 코드로 해결 완료 !
`;

const MainListingSection = styled.article`
  flex: 1; // 이 코드로 해결 완료 !
  width: calc(100%-360px);
`;

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
const DetailContentSection = styled.section`
  /* width: 100%; */
  margin-bottom: 60px;
  /* border-bottom: 1px solid ${(props) => props.theme.borderGray}; */
  padding-right: 20px;
`;

const HorizontalLine = styled.hr`
  display: inline-block;
  width: 690px;
`;

const MainContent = styled.p`
  /* padding-right: 20px; */
`;

const TechStack = styled.h6`
  margin-top: 20px;
  font-weight: 600;
  font-size: 16px;
`;

const LocationSection = styled.section`
  margin-top: 20px;
  font-weight: 600;
`;
const DetailedList = styled.li`
  display: flex;
  margin-bottom: 20px;
`;
const ListTitle = styled.h4`
  width: 80px;
  color: ${(props) => props.theme.textGray};
`;

export default ListingDetail;

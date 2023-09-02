import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { JobDetailResponse } from '../../types/jobDetailType';
import ResponseRate from '../../components/ResponseRateTag/ResponseRate';
import HashTag from '../../components/HashTags/HashTag';
import AsideMenu from './components/AsideMenu';
import Carousel from './components/Carousel';

const ListingDetail = () => {
  const { id } = useParams();
  console.log(`Params id: ${id}`);

  const url = `/data/jobDetailData1.json`; //테스트용 mock data url
  // const url = `api/v1/employment/{employementId}/likes`;
  // const url = `api/v1/employment/${id}/likes`; //최종 통신용 url

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
                <p>{jobData?.deadline}</p>
              </DetailedList>
              <DetailedList>
                <ListTitle>근무지역</ListTitle>
                <p>{jobData?.address}</p>
              </DetailedList>
            </ul>
            <MapBox>
              <img src='/images/ListingDetail/map.png' alt='naver map' />
            </MapBox>
          </LocationSection>
        </MainListingSection>
        <AsideMenu
          likeNum={jobData?.likeNum || 0}
          applicantReward={jobData?.applicantReward || 500000}
          recommenderReward={jobData?.recommenderReward || 500000}
        />
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

const MapBox = styled.div`
  width: 100%;
  padding-right: 20px;

  img {
    width: 100%;
  }
`;

export default ListingDetail;

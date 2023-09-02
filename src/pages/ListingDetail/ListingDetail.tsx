import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { JobDetailResponse } from '../../types/jobDetailType';
import ResponseRate from '../../components/ResponseRateTag/ResponseRate';
import HashTag from '../../components/HashTags/HashTag';
import AsideMenu from './components/AsideMenu';
import Carousel from './components/Carousel';
import { API_BASE_URL } from '../../config/config';
import FrontAsideMenu from './components/FrontAsideMenu';

const ListingDetail = () => {
  const { id } = useParams();
  console.log(`Params id: ${id}`);

  // const url = `/data/jobDetailData1.json`; //테스트용 mock data url
  // const url = `api/v1/employment/{employementId}/likes`;
  const url = `${API_BASE_URL}api/v1/employments/${id}`; //최종 통신용 url

  const { loading, data, error } = useFetch<JobDetailResponse>(url);
  // console.log('hook? ', data?.result);
  const jobData = data?.result;
  console.log('hook??? ', data?.result);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        console.log('res? ', res);
        return res.json();
      })
      .then((data) => {
        console.log('useEffect 채용 상세 데이터 ✅? ', data);
      });
  }, []);
  return (
    <Container>
      <DetailMain>
        <MainListingSection>
          <Carousel img='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F2134%2Fdz1ns2td09zk9lh6__1080_790.jpg&w=1000&q=75' />
          <DetailTitleContainer>
            <JobTitle>{jobData?.employmentTitle}</JobTitle>
            <DetailInfoWrap>
              <div>{jobData?.companyName}</div>
              <ResponseRate />
              <Separator />
              <AddressShort>{jobData?.region} · 한국</AddressShort>
            </DetailInfoWrap>
            <ThemeTagsContainer>
              {jobData?.hashtagName.map((theme, index) => (
                <HashTag text={`# ${theme}`} key={index} />
              ))}
            </ThemeTagsContainer>
          </DetailTitleContainer>
          <DetailContentSection>
            <MainContent>
              <CompanyIntro>
                <h3>[회사소개]</h3>
                <p>{jobData?.employmentContent}</p>
              </CompanyIntro>
              <CompanyIntro>
                <h3>[채용배경]</h3>
                <p>
                  IT기업이 좋은 서비스를 만드는 것 이외에 사회에 기여할 수 있는
                  방법은 무엇이 있을까요? {jobData?.companyName}은 신입개발자를
                  훌륭하게 육성하는 것이 그 방법 중 하나라고 믿고 있어요!
                </p>
                <br />
                <p>
                  아직 회사 규모가 크지 않아 많이 채용할 순 없지만, 매년
                  일정하게 신입 개발자를 채용하고 있습니다. 입사하시게 되면 선배
                  개발자가 꼼꼼하게 챙겨주며 즐겁게 일하고 성장할 수 있을거에요.
                </p>
                <br />
                <p>
                  신입 개발자를 멋진 경력직 개발자로 성장시키는 것은
                  {` ${jobData?.companyName}`}, 가장 자신있으니 많은 관심
                  부탁드려요!
                </p>
              </CompanyIntro>
              <Qualification>
                <h3>주요 업무</h3>
                <li>- React를 활용한 크티 플랫폼 프론트엔드 개발</li>
              </Qualification>
              <Qualification>
                <h3>자격 요건</h3>
                <li>- 경력 3년 이상</li>
                <li>
                  - React를 사용한 상용 웹 애플리케이션 개발 및 유지보수에
                  경험이 있는 분
                </li>
                <li>
                  - JavaScript, HTML, CSS 등 웹 프론트엔드 기술에 능숙한 분
                </li>
                <li>- RESTful API와의 상호 작용 경험이 있는 분</li>
              </Qualification>
              <Qualification>
                <h3>우대사항</h3>
                <li>- Laravel(PHP) 다뤄본 경험</li>
                <li>- UI/UX 디자인 및 기획에 대한 이해와 경험이 많으신 분</li>
                <li>- 더 나은 로직 개발을 위해 항상 고민하는 분</li>
                <li>- 긍정적인 커뮤니케이션</li>
              </Qualification>
              <Qualification>
                <h3>혜택 및 복지</h3>
                <li>
                  - 유연 근무제 (오전 11시 이전 자율 출근, 4시 이후 자율 퇴근,
                  8시간 근무)
                </li>
                <li>- 금요일 2시간 단축 근무 (주 38시간)</li>
                <li>- 야근 없음</li>
                <li>- 법정 휴가</li>
              </Qualification>
            </MainContent>
            <div>
              <TechStack>기술스택 ・ 툴</TechStack>
              {jobData?.skillStack.map((tag, index) => (
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
        <FrontAsideMenu
          likeNum={jobData?.likeNum || 0}
          applicantReward={jobData?.applicantReward || '500000'}
          recommenderReward={jobData?.recommenderReward || '500000'}
        />
        {/* <AsideMenu
          likeNum={jobData?.likeNum || 0}
          applicantReward={jobData?.applicantReward || '500000'}
          recommenderReward={jobData?.recommenderReward || '500000'}
        /> */}
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
  line-height: 27px;

  h3 {
    font-weight: 600;
  }
`;

const CompanyIntro = styled.div`
  margin-bottom: 30px;
`;

const Qualification = styled.ul`
  margin-bottom: 30px;
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

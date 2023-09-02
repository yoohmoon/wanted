import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Job } from '../../types/jobListingTypes';
import ResponseRate from '../ResponseRateTag/ResponseRate';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  console.log(job);
  console.log('in question! ', job.employmentId);

  return (
    <Container>
      <Link to={`/wd/${job.employmentId}`}>
        <div>
          <HeadImg img='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F37778%2Fzc4vpxjizexcre5p__400_400.jpg&w=400&q=75' />
          <JobInfo>
            <JobTitle>{job.employmentTitle}</JobTitle>
            <Company>{job.companyName}</Company>
            <ResponseTag>
              <ResponseRate />
            </ResponseTag>
            <Address>{`${job.region} · 한국`}</Address>
            <p>채용 보상금 {job.rewardSum / 10}만원</p>
          </JobInfo>
        </div>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  /* width: 25%; */
  /* padding: 10px; */
  font-size: 14px;
`;

const HeadImg = styled.header<{ img: string }>`
  /* width: 100%; */
  padding-bottom: 75%;
  border-radius: 4px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

const JobInfo = styled.div`
  padding: 14px 0;
`;

const JobTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const Company = styled.p`
  margin-top: 10px;
  font-weight: 600;
`;

const ResponseTag = styled.div`
  margin-top: 4px;
`;

const Address = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.textGray};
`;

export default JobCard;

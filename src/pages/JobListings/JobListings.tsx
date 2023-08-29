import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import JobCard from '../../components/JobCard/JobCard';
import { Job } from '../../types/jobListingTypes';
const JobListings = () => {
  const [cardData, setCardData] = useState<Job[]>([]);

  useEffect(() => {
    // const response = await fetch(`/data/cardData.json`);
    // const job = await response.json();

    fetch(`/data/cardData.json`)
      .then((res) => res.json())
      .then((data) => setCardData(data.result));
  }, []);

  /* 
  export default async function Read({ params }) {
  //   console.log(params);
  const response = await fetch('http://localhost:9999/topics/' + params.id, {
    cache: 'no-store',
  });
  const topic = await response.json();
  */

  return (
    <Container>
      <JobCardsBox>
        {cardData.map((job) => (
          <JobCard key={job.companyId} job={job} />
        ))}
      </JobCardsBox>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'PretendardVariable';
  margin: 38px 0;
`;

const JobCardsBox = styled.div`
  /* margin: -10px; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export default JobListings;

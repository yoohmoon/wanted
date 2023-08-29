import React from 'react';
import { styled } from 'styled-components';
import Nav from '../../components/Nav/Nav';

const JobListings = () => {
  return (
    <>
      <Nav />
      <div>
        JobListings
        <JobTitle>ios</JobTitle>
      </div>
    </>
  );
};

const JobTitle = styled.p`
  font-family: 'PretendardVariable';
`;

export default JobListings;

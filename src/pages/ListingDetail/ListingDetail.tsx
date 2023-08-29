import React from 'react';
import { styled } from 'styled-components';
import ResponseRate from '../../components/ResponseRateTag/ResponseRate';

const ListingDetail = () => {
  return (
    <Container>
      ListingDetail
      <ResponseRate />
      <DetailMain>
        <article></article>
        <aside></aside>
      </DetailMain>
    </Container>
  );
};

const Container = styled.div`
  margin: 38px 0;
`;
const DetailMain = styled.main``;

export default ListingDetail;

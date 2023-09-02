import React from 'react';
import styled from 'styled-components';

type CarouselProps = {
  img: string;
  // img: string[];
};

const Carousel = ({ img }: CarouselProps) => {
  return (
    <Container>
      <CarouselWrapper>
        {/* {img.map((imgItem, index) => (
          <div key={index}>
            <img src={imgItem} alt={imgItem} />
          </div>
        ))} */}
        <CarouselItem>
          <img src={img} alt={img} />
        </CarouselItem>
      </CarouselWrapper>
    </Container>
  );
};

const Container = styled.section`
  display: inline-block;
  width: calc(100%-360px);
  padding-right: 20px;
`;
const CarouselWrapper = styled.div`
  width: 100%;
`;

const CarouselItem = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;
export default Carousel;

/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import * as React from 'react';
import images from 'assets/images';
import ImageSection from 'components/ImageSection';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <Container>
      {images.length > 0
        && images.map((i, index) => (
          <ImageSection key={index} image={i} next={images[index + 1] ?? {}} />
        ))}
    </Container>
  );
}

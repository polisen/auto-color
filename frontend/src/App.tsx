/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import * as React from 'react';
import { useState, useEffect } from 'react';
import images from 'assets/images';
import ImageSection from 'components/ImageSection';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 15em;
  display: grid;
  grid-template: 1fr 1fr / 1fr 3fr;
  grid-template-areas: "logo headline" "button something";
`;

const Logo = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
  h1 {
    padding-left: 25px;
  }
`;

const Headline = styled.div`
  grid-area: headline;
`;

const Something = styled.div`
  grid-area: something;
`;

const Shuffle = styled.div`
  grid-area: button;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderArea = ({ handlers }: { handlers: any }) => (
  <HeaderDiv>
    <Logo>
      <h1>AutoColor v1</h1>
    </Logo>
    <Headline />
    <Shuffle>
      <button type="button" onClick={handlers.shuffleImages}>
        Shuffle Images
      </button>
      <button type="button" onClick={handlers.regeneratePalettes}>
        Regenerate Palette
      </button>
    </Shuffle>
    <Something />
  </HeaderDiv>
);

export default function Home() {
  const [Images, setImages] = useState(images);

  function shuffleImages() {
    setImages(new Array(...Images.sort(() => 0.5 - Math.random())));
  }
  function regeneratePalettes() {
    setImages(new Array(...Images));
  }

  useEffect(() => {
    console.debug({ Images });
  }, [Images]);
  return (
    <Container>
      <HeaderArea handlers={{ shuffleImages, regeneratePalettes }} />
      {Images.length > 0
        && Images.map((i, index) => (
          <ImageSection key={index} image={i} next={Images[index + 1] ?? {}} />
        ))}
    </Container>
  );
}

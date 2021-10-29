/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getComplements } from 'utility/getComplementaryColors';
import { usePalette } from 'color-thief-react';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100em;

  #imageSection {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  #imageContainer,
  #paletteBarContainer {
    width: 100%;
    height: 100%;
    min-height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #colorsContainer {
    display: flex;
    /* grid-template-rows: repeat(auto-fit, 1fr); */
    /* grid-template-columns: repeat(auto-fit, 1fr); */
    /* grid-auto-rows: minmax(100px, auto); */
    width: 100%;
    height: 100%;
  }
  #nextPalette {
    width: 100%;
    height: 100%;
  }
`;

const Color = styled.div<{ c: string }>`
  height: 100%;
  width: 100%;
  background-color: ${({ c }) => c || 'none'};
`;
const Colors = ({ data }: { data: string[] }) => (
  <div id="colorsContainer">{data && data.map((c) => <Color key={c} c={c} />)}</div>
);

const PaletteBar = ({
  url,
  setPalette,
  colorCount = 4,
  format = 'hslString',
}: any) => {
  const { data, loading, error } = usePalette(url, colorCount, format, { crossOrigin: 'anonymous' });
  useEffect(() => {
    if (!loading && data) setPalette(data);
  }, [data, loading]);

  useEffect(() => {
    console.debug({ error });
  }, [error]);
  return (
    <div id="paletteBarContainer">
      <Colors data={data ?? []} />
    </div>
  );
};

export default function ImageSection({
  image,
  next,
}: {
  image: any;
  next: any;
}) {
  const [Palette, setPalette]: any = useState([]);
  const { data, loading } = usePalette(next, 4, 'hslString');
  const [method] = useState('triad');
  const [Complements, setComplements]: any = useState([]);
  function addToPalette(colors: string[]) {
    setPalette([...new Set([...Palette, ...colors])]);
  }

  useEffect(() => {
    Palette.length > 0 && setComplements(getComplements(Palette, method));
  }, [Palette]);

  useEffect(() => {
    if (!loading && data) addToPalette(data);
  }, [data, loading]);
  return (
    <Container>
      <div id="imageSection">
        <div id="imageContainer">
          <StyledImage src={image} width="120" height="120" />
        </div>
        <PaletteBar url={image} setPalette={addToPalette} />
      </div>
      <div id="nextPalette">
        <div id="paletteBarContainer">
          <Colors data={Complements ?? []} />
        </div>
      </div>
    </Container>
  );
}

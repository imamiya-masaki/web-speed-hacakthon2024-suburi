import "./heroimage.css"

import styled from 'styled-components';
const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      {/* <_Image ref={imageRef} alt="Cyber TOON" /> */}
      <picture>
        <source
          media="(max-width: 512px)"
          srcSet="
            assets/heroimage-1-512.png 1x,
            assets/heroimage-2-512.png 2x
          "
        />
        <img
          src="assets/heroimage-2-1024.png"
          srcSet="
            assets/heroimage-1-1024.pngg 1x,
            assets/heroimage-2-1024.png 2x
          "
          alt="Cyber TOON"
          className="hero-image"
        />
      </picture>
    </_Wrapper>
  );
};

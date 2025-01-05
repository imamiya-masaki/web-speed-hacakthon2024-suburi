import "./heroimage.css"
import './HeroImage.module.css';

export const HeroImage: React.FC = () => {
  return (
    <div className="HeroImage___Wrapper__styled">
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
    </div>
  );
};

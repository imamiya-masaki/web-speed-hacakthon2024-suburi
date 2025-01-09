import "./heroimage.css"
import './HeroImage.module.css';

export const HeroImage: React.FC = () => {
  return (
    <div className="HeroImage___Wrapper__styled">
      <picture>
      <source
          media="(max-width: 430px)"
          srcSet="
            assets/heroimage-1-430.webp 1x,
            assets/heroimage-2-430.webp 2x
          "
        />
        <source
          media="(max-width: 512px)"
          srcSet="
            assets/heroimage-1-512.webp 1x,
            assets/heroimage-2-512.webp 2x
          "
        />
        <img
          src="assets/heroimage-2-1024.webp"
          srcSet="
            assets/heroimage-1-1024.webp 1x,
            assets/heroimage-2-1024.webp 2x
          "
          alt="Cyber TOON"
          className="hero-image"
        />
      </picture>
    </div>
  );
};

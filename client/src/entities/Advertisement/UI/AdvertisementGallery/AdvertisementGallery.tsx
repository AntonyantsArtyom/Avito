import type { IAdvertisement } from "../../types/Advertisement";
import { StyledCard, StyledImage } from "./AdvertisementGallery.styles";

export const AdvertisementGallery = ({ images }: Pick<IAdvertisement, "images">) => {
  return (
    <StyledCard>
      {images.map((image, index) => (
        <StyledImage key={index} src={image} alt={`Изображение объявления`} />
      ))}
    </StyledCard>
  );
};

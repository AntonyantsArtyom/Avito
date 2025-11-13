import { useState, useEffect } from "react";
import type { IAdvertisement } from "../entities/Advertisement/types/Advertisement";
import { AdvertisementListItem } from "../entities/Advertisement/UI/AdvertisementListItem/AdvertisementListItem";

export const AdvertisementsListPage = () => {
  const [advertisements, setAdvertisements] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/ads")
      .then((response) => response.json())
      .then((data) => setAdvertisements(data.ads));
  }, []);

  return (
    <>
      {advertisements.map((advertisement) => (
        <AdvertisementListItem
          key={advertisement.id}
          id={advertisement.id}
          title={advertisement.title}
          price={advertisement.price}
          category={advertisement.category}
          createdAt={advertisement.createdAt}
        />
      ))}
    </>
  );
};

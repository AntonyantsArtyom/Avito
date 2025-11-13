import { useEffect } from "react";

import { AdvertisementListItem } from "../entities/Advertisement/UI/AdvertisementListItem/AdvertisementListItem";
import { useAdvertisementStore } from "../entities/Advertisement/model/AdvertisementStore";

export const AdvertisementsListPage = () => {
  const { advertisements, fetchAdvertisements } = useAdvertisementStore();

  useEffect(() => {
    fetchAdvertisements();
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

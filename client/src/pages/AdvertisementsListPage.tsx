import { useEffect } from "react";
import { Pagination } from "antd";
import { AdvertisementListItem } from "../entities/Advertisement/UI/AdvertisementListItem/AdvertisementListItem";
import { useAdvertisementStore } from "../entities/Advertisement/model/AdvertisementStore";

export const AdvertisementsListPage = () => {
  const { advertisements, fetchAdvertisements, currentPage, totalItems, limit, goToPage } = useAdvertisementStore();

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
      <Pagination current={currentPage} total={totalItems} pageSize={limit} showSizeChanger={false} onChange={(newPage) => goToPage(newPage)} />
    </>
  );
};

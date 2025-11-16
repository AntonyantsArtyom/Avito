import { useEffect } from "react";
import { Button, Pagination } from "antd";
import { AdvertisementListItem } from "../../entities/Advertisement/UI/AdvertisementListItem/AdvertisementListItem";
import { useAdvertisementStore } from "../../entities/Advertisement/model/AdvertisementStore";
import { AdvertisementsFilter } from "../../features/AdvertisementsFilter/AdvertisementsFilter";
import { StyledAsideContainer, StyledContainer, StyledItemsContainer, StyledPaginationCard } from "./AdvertisementsListPage.styles";
import { PieChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const AdvertisementsListPage = () => {
  const { advertisements, fetchAdvertisements, currentPage, totalItems, limit, goToPage } = useAdvertisementStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const handleStatsClick = () => {
    navigate(`/stats`);
  };

  return (
    <StyledContainer>
      <StyledAsideContainer>
        <AdvertisementsFilter />
        <Button type="primary" onClick={handleStatsClick}>
          Моя статистика
          <PieChartOutlined />
        </Button>
      </StyledAsideContainer>
      <StyledItemsContainer>
        <div />
        {advertisements.map((advertisement) => (
          <AdvertisementListItem
            key={advertisement.id}
            id={advertisement.id}
            title={advertisement.title}
            price={advertisement.price}
            category={advertisement.category}
            createdAt={advertisement.createdAt}
            status={advertisement.status}
            priority={advertisement.priority}
            images={advertisement.images}
          />
        ))}

        <StyledPaginationCard>
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={limit}
            showSizeChanger={false}
            onChange={(newPage) => goToPage(newPage)}
            showTotal={(total) => `всего ${total} объявлений`}
          />
        </StyledPaginationCard>
      </StyledItemsContainer>
    </StyledContainer>
  );
};

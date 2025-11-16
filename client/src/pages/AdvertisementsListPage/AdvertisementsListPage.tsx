import { useEffect, useRef, useState } from "react";
import { Button, Pagination } from "antd";
import { AdvertisementListItem } from "../../entities/Advertisement/UI/AdvertisementListItem/AdvertisementListItem";
import { useAdvertisementStore } from "../../entities/Advertisement/model/AdvertisementStore";
import { AdvertisementsFilter } from "../../features/AdvertisementsFilter/AdvertisementsFilter";
import { StyledAsideContainer, StyledContainer, StyledItemsContainer, StyledPaginationCard } from "./AdvertisementsListPage.styles";
import { PieChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const AdvertisementsListPage = () => {
  const { advertisements, currentPage, totalItems, limit, goToPage } = useAdvertisementStore();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [pageForView, setPageVorView] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    goToPage(pageForView, abortControllerRef.current.signal);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [pageForView]);

  const handleStatsClick = () => {
    navigate(`/stats`);
  };

  const handlePageChange = (page: number) => {
    setPageVorView(page);
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
            onChange={handlePageChange}
            showTotal={(total) => `всего ${total} объявлений`}
          />
        </StyledPaginationCard>
      </StyledItemsContainer>
    </StyledContainer>
  );
};

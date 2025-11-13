import { useEffect } from "react";
import { Pagination, Card, Select, InputNumber, Input, Button } from "antd";
import { AdvertisementListItem } from "../entities/Advertisement/UI/AdvertisementListItem/AdvertisementListItem";
import { useAdvertisementStore } from "../entities/Advertisement/model/AdvertisementStore";

const { Search } = Input;
const { Option } = Select;

export const AdvertisementsListPage = () => {
  const { advertisements, fetchAdvertisements, currentPage, totalItems, limit, goToPage, filters, setFilters, clearFilters, applyFilters } =
    useAdvertisementStore();

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const handleStatusChange = (values: string[]) => {
    setFilters({ status: values });
  };

  const handleCategoryChange = (value: number) => {
    setFilters({ categoryId: value });
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setFilters({
      minPrice: min || undefined,
      maxPrice: max || undefined,
    });
  };

  const handleSearch = (value: string) => {
    setFilters({ search: value });
    applyFilters();
  };

  const handleClearFilters = () => {
    clearFilters();
    applyFilters();
  };

  return (
    <>
      <Card>
        <Select mode="multiple" placeholder="Статус" value={filters.status} onChange={handleStatusChange} style={{ width: "100%" }}>
          <Option value="pending">Ожидает модерации</Option>
          <Option value="approved">Одобрено</Option>
          <Option value="rejected">Отклонено</Option>
          <Option value="draft">Черновик</Option>
        </Select>

        <Select placeholder="Категория" value={filters.categoryId} onChange={handleCategoryChange} style={{ width: "100%" }} allowClear>
          <Option value={1}>Электроника</Option>
          <Option value={2}>Одежда</Option>
          <Option value={3}>Авто</Option>
          <Option value={4}>Недвижимость</Option>
          <Option value={5}>Услуги</Option>
        </Select>

        <Input.Group compact>
          <InputNumber
            placeholder="Мин цена"
            value={filters.minPrice}
            onChange={(min) => handlePriceChange(min, filters.maxPrice!)}
            style={{ width: "45%" }}
            min={0}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          />
          <Input style={{ width: "10%", borderLeft: 0, borderRight: 0, pointerEvents: "none", textAlign: "center" }} placeholder="–" disabled />
          <InputNumber
            placeholder="Макс цена"
            value={filters.maxPrice}
            onChange={(max) => handlePriceChange(filters.minPrice!, max)}
            style={{ width: "45%" }}
            min={0}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          />
        </Input.Group>

        <Search
          placeholder="Поиск по названию"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          onSearch={handleSearch}
          enterButton
        />

        <Button type="primary" onClick={applyFilters}>
          Применить
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={handleClearFilters}>
          Сбросить
        </Button>
      </Card>

      <div style={{ marginBottom: 24 }}>
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
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={limit}
          showSizeChanger={false}
          onChange={(newPage) => goToPage(newPage)}
          showTotal={(total) => `всего ${total} объявлений`}
        />
      </div>
    </>
  );
};

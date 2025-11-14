import { Select, Input, InputNumber, Button } from "antd";
import { useAdvertisementStore } from "../../entities/Advertisement/model/AdvertisementStore";
import { StyledCard, StyledPriceInput } from "./AdvertisementsFilter.styles";

const { Search } = Input;
const { Option } = Select;

export const AdvertisementsFilter = () => {
  const { filters, setFilters, applyFilters, clearFilters } = useAdvertisementStore();

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
    <StyledCard>
      <Select mode="multiple" placeholder="Статус" value={filters.status} onChange={handleStatusChange}>
        <Option value="pending">Ожидает модерации</Option>
        <Option value="approved">Одобрено</Option>
        <Option value="rejected">Отклонено</Option>
        <Option value="draft">Черновик</Option>
      </Select>

      <Select placeholder="Категория" value={filters.categoryId} onChange={handleCategoryChange} allowClear>
        <Option value={1}>Электроника</Option>
        <Option value={2}>Одежда</Option>
        <Option value={3}>Авто</Option>
        <Option value={4}>Недвижимость</Option>
        <Option value={5}>Услуги</Option>
      </Select>

      <StyledPriceInput>
        <InputNumber
          placeholder="Мин цена"
          value={filters.minPrice}
          onChange={(min) => handlePriceChange(min, filters.maxPrice!)}
          min={0}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        />
        <InputNumber
          placeholder="Макс цена"
          value={filters.maxPrice}
          onChange={(max) => handlePriceChange(filters.minPrice!, max)}
          min={0}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        />
      </StyledPriceInput>

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
      <Button onClick={handleClearFilters}>Сбросить</Button>
    </StyledCard>
  );
};

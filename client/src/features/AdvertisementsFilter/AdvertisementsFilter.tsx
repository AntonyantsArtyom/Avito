import { useRef, useEffect } from "react";
import { Select, Input, InputNumber, Button, Space, Typography } from "antd";
import { useAdvertisementStore } from "../../entities/Advertisement/model/AdvertisementStore";
import { StyledCard, StyledPriceInput, StyledSpace } from "./AdvertisementsFilter.styles";
import { useSearchParams, useLocation } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

export const AdvertisementsFilter = () => {
  const { filters, setFilters, applyFilters, clearFilters } = useAdvertisementStore();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    const newFilters = {
      status: params.status ? params.status.split("+") : [],
      category: params.category || undefined,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      search: params.search || "",
      sortBy: (params.sortBy as "createdAt" | "price" | "priority") || "createdAt",
      sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
    };

    setFilters(newFilters);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.status.length > 0) {
      params.set("status", filters.status.join("+"));
    }
    if (filters.category) {
      params.set("category", filters.category.toString());
    }
    if (filters.minPrice !== undefined) {
      params.set("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params.set("maxPrice", filters.maxPrice.toString());
    }
    if (filters.search) {
      params.set("search", filters.search);
    }

    params.set("sortBy", filters.sortBy);
    params.set("sortOrder", filters.sortOrder);

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleStatusChange = (values: string[]) => {
    setFilters({ status: values });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ category: value });
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setFilters({
      minPrice: min || undefined,
      maxPrice: max || undefined,
    });
  };

  const handleSortChange = (sortBy: "createdAt" | "price" | "priority") => {
    setFilters({ sortBy });
  };

  const handleOrderChange = (sortOrder: "asc" | "desc") => {
    setFilters({ sortOrder });
  };

  const handleSearch = (value: string) => {
    setFilters({ search: value });
    handleApplyFilters();
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams(new URLSearchParams(), { replace: true });
    handleApplyFilters();
  };

  const handleApplyFilters = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    applyFilters(abortControllerRef.current.signal);
  };

  const getOrderText = (sortBy: "createdAt" | "price" | "priority", sortOrder: "asc" | "desc") => {
    const textStart = "В начале";

    switch (sortBy) {
      case "createdAt":
        return `${textStart} ${sortOrder === "desc" ? "новые" : "старые"}`;
      case "price":
        return `${textStart} ${sortOrder === "desc" ? "дорогие" : "дешевые"}`;
      case "priority":
        return `${textStart} ${sortOrder === "desc" ? "срочные" : "обычные"}`;
    }
  };

  return (
    <StyledCard>
      <Typography.Text>Фильтрация</Typography.Text>

      <Select mode="multiple" placeholder="Статус" value={filters.status} onChange={handleStatusChange} showSearch={false}>
        <Option value="pending">Ожидает модерации</Option>
        <Option value="approved">Одобрено</Option>
        <Option value="rejected">Отклонено</Option>
        <Option value="draft">Черновик</Option>
      </Select>

      <Select placeholder="Категория" value={filters.category} onChange={handleCategoryChange} allowClear>
        {["Электроника", "Недвижимость", "Транспорт", "Работа", "Услуги", "Животные", "Мода", "Детское"].map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
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

      <Typography.Text>Сортировка</Typography.Text>

      <Select value={filters.sortBy} onChange={handleSortChange}>
        <Option value="createdAt">По дате создания</Option>
        <Option value="price">По цене</Option>
        <Option value="priority">По приоритету</Option>
      </Select>

      <Select value={filters.sortOrder} onChange={handleOrderChange} disabled={!filters.sortBy}>
        <Option value="asc">{getOrderText(filters.sortBy, "asc")}</Option>
        <Option value="desc">{getOrderText(filters.sortBy, "desc")}</Option>
      </Select>

      <StyledSpace />

      <Space>
        <Button onClick={handleClearFilters}>Сбросить</Button>
        <Button type="primary" onClick={handleApplyFilters}>
          Применить
        </Button>
      </Space>
    </StyledCard>
  );
};

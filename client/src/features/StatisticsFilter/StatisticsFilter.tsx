import { Select, Typography } from "antd";
import { StyledCard } from "./StatisticsFilter.styles";
import { useStatisticsStore } from "../../entities/Statistics/model/StatisticsStore";
import { useRef } from "react";
const { Option } = Select;

export const StatisticsFilter = () => {
  const { filters, setFilters, applyFilters } = useStatisticsStore();
  const abortControllerRef = useRef<AbortController | null>(null);

  const handlePeriodChange = (value: "week" | "today" | "month") => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setFilters({ period: value });
    applyFilters(abortControllerRef.current.signal);
  };

  return (
    <StyledCard>
      <Typography.Text>Период</Typography.Text>

      <Select value={filters.period} onChange={handlePeriodChange}>
        <Option value="today">За сегодня</Option>
        <Option value="week">За неделю</Option>
        <Option value="month">За месяц</Option>
      </Select>
    </StyledCard>
  );
};

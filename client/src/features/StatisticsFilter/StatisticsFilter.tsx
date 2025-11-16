import { Select, Typography } from "antd";
import { StyledCard } from "./StatisticsFilter.styles";
import { useStatisticsStore } from "../../entities/Statistics/model/StatisticsStore";
const { Option } = Select;

export const StatisticsFilter = () => {
  const { filters, setFilters, applyFilters } = useStatisticsStore();

  const handlePeriodChange = (value: "week" | "today" | "month") => {
    setFilters({ period: value });
    applyFilters();
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

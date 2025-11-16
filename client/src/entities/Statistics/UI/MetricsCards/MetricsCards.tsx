import { Statistic } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import type { SummaryStats } from "../../types/Statistics";
import { StyledCard, StyledContainer } from "./MetricsCards.styles";
import { formatSecondsToMinutes } from "../../../../shared/utils/formatSecundsToMinuts";

interface MetricsCardsProps {
  summaryStats: SummaryStats;
}

export const MetricsCards = ({ summaryStats }: MetricsCardsProps) => {
  return (
    <StyledContainer>
      <StyledCard>
        <Statistic title="Всего проверено" value={summaryStats.totalReviewed} prefix={<FileTextOutlined />} />
      </StyledCard>

      <StyledCard>
        <Statistic
          title="Одобрено"
          value={summaryStats.approvedPercentage.toFixed(2)}
          suffix="%"
          prefix={<CheckCircleOutlined />}
          valueStyle={{ color: "#3f8600" }}
        />
      </StyledCard>

      <StyledCard>
        <Statistic
          title="Отклонено"
          value={summaryStats.rejectedPercentage.toFixed(2)}
          suffix="%"
          prefix={<CloseCircleOutlined />}
          valueStyle={{ color: "#cf1322" }}
        />
      </StyledCard>

      <StyledCard>
        <Statistic title="Среднее время" value={formatSecondsToMinutes(summaryStats.averageReviewTime)} prefix={<ClockCircleOutlined />} />
      </StyledCard>
    </StyledContainer>
  );
};

import { useEffect } from "react";
import { useStatisticsStore } from "../../entities/Statistics/model/StatisticsStore";
import { MetricsCards } from "../../entities/Statistics/UI/MetricsCards/MetricsCards";
import { ActivityChart } from "../../entities/Statistics/UI/ActivityChart/ActivityChart";
import { DecisionsChart } from "../../entities/Statistics/UI/DecisionsChart/DecisionsChart";
import { CategoriesChart } from "../../entities/Statistics/UI/CategoriesChart/CategoriesChart";
import { StyledContainer, StyledItemsContainer } from "./StatisticsPage.styles";

export const StatisticsPage = () => {
  const { summaryStats, activityChart, decisionsChart, categoriesChart, fetchAllStatistics } = useStatisticsStore();

  useEffect(() => {
    fetchAllStatistics();
  }, []);

  if (!summaryStats || !activityChart || !decisionsChart || !categoriesChart) return null;

  return (
    <StyledContainer>
      <MetricsCards summaryStats={summaryStats} />
      <StyledItemsContainer>
        <div />
        <ActivityChart activityChart={activityChart} />
        <DecisionsChart decisionsChart={decisionsChart} />
        <CategoriesChart categoriesChart={categoriesChart} />
      </StyledItemsContainer>
    </StyledContainer>
  );
};

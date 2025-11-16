import { useEffect, useRef } from "react";
import { useStatisticsStore } from "../../entities/Statistics/model/StatisticsStore";
import { MetricsCards } from "../../entities/Statistics/UI/MetricsCards/MetricsCards";
import { ActivityChart } from "../../entities/Statistics/UI/ActivityChart/ActivityChart";
import { DecisionsChart } from "../../entities/Statistics/UI/DecisionsChart/DecisionsChart";
import { CategoriesChart } from "../../entities/Statistics/UI/CategoriesChart/CategoriesChart";
import { StyledAsideContainer, StyledContainer, StyledItemsContainer, StyledNavContainer } from "./StatisticsPage.styles";
import { ToListNavButton } from "../../shared/UI/ToListNavButton/ToListNavButton";
import { StatisticsFilter } from "../../features/StatisticsFilter/StatisticsFilter";

export const StatisticsPage = () => {
  const { summaryStats, activityChart, decisionsChart, categoriesChart, fetchAllStatistics } = useStatisticsStore();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    fetchAllStatistics();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  if (!summaryStats || !activityChart || !decisionsChart || !categoriesChart) return null;

  return (
    <StyledContainer>
      <StyledAsideContainer>
        <StatisticsFilter />
        <MetricsCards summaryStats={summaryStats} />
        <StyledNavContainer>
          <ToListNavButton />
        </StyledNavContainer>
      </StyledAsideContainer>
      <StyledItemsContainer>
        <div />
        <ActivityChart activityChart={activityChart} />
        <DecisionsChart decisionsChart={decisionsChart} />
        <CategoriesChart categoriesChart={categoriesChart} />
      </StyledItemsContainer>
    </StyledContainer>
  );
};

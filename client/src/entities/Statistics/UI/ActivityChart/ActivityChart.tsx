import { Column } from "@ant-design/plots";
import { Card } from "antd";
import type { ActivityChartData } from "../../types/Statistics";

interface ActivityChartProps {
  activityChart: ActivityChartData[];
}

export const ActivityChart = ({ activityChart }: ActivityChartProps) => {
  const config = {
    data: activityChart.flatMap((item) => [
      { date: item.date, type: "Одобрено", count: item.approved },
      { date: item.date, type: "Отклонено", count: item.rejected },
      { date: item.date, type: "На доработку", count: item.requestChanges },
    ]),
    xField: "date",
    yField: "count",
    seriesField: "type",
    isGroup: true,
    color: ["rgb(63, 134, 0)", "#ff4d4f", "#faad14"],
  };

  return (
    <Card>
      <Column {...config} />
    </Card>
  );
};

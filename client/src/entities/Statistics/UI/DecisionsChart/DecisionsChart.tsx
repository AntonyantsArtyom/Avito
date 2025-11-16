import { Pie } from "@ant-design/plots";
import { Card } from "antd";
import type { DecisionsChartData } from "../../types/Statistics";

interface DecisionsChartProps {
  decisionsChart: DecisionsChartData;
}

export const DecisionsChart = ({ decisionsChart }: DecisionsChartProps) => {
  const config = {
    data: [
      { type: "Одобрено", value: decisionsChart.approved },
      { type: "Отклонено", value: decisionsChart.rejected },
      { type: "На доработку", value: decisionsChart.requestChanges },
    ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return (
    <Card>
      <Pie {...config} />
    </Card>
  );
};

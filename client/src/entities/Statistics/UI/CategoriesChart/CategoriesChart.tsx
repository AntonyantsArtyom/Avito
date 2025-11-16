import { Card, List, Progress, Typography } from "antd";
import type { CategoriesChartData } from "../../types/Statistics";

interface CategoriesChartProps {
  categoriesChart: CategoriesChartData;
}

export const CategoriesChart = ({ categoriesChart }: CategoriesChartProps) => {
  const total = Object.values(categoriesChart).reduce((sum, count) => sum + count, 0);
  const categoriesArray = Object.entries(categoriesChart).map(([category, count]) => ({
    category,
    count,
    percentage: total > 0 ? (count / total) * 100 : 0,
  }));

  return (
    <Card>
      <List
        dataSource={categoriesArray}
        renderItem={(item) => (
          <List.Item>
            <div style={{ width: "100%" }}>
              <div>
                <Typography.Text strong>{item.category}</Typography.Text>
                <Typography.Text> {item.count} объяв.</Typography.Text>
              </div>
              <Progress percent={item.percentage} size="small" format={() => `${item.percentage.toFixed(1)}%`} />
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

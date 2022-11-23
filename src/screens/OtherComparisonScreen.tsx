import { Box, ScrollView, Text } from "native-base";
import { makeDateRanges } from "../helpers";
import { OtherComparisonWidget } from "../features/compare";

export const OtherComparisonScreen = ({ route }) => {
  const { dateRange, metrics, criteria } = route.params;
  console.log(dateRange, metrics, criteria);

  const selectedDateRange = makeDateRanges()[dateRange];

  return (
    <Box flex={1} px={4} py={8}>
      <ScrollView>
        {metrics.map((metric) => (
          <OtherComparisonWidget
            metric={metric}
            key={metric.id.toString()}
            criteria={criteria}
            dateRange={selectedDateRange}
          />
        ))}
      </ScrollView>
    </Box>
  );
};

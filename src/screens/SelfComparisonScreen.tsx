import { Box, Heading, ScrollView, VStack } from "native-base";
import { ComparisonWidget } from "../features/compare/ComparisonWidget";

export const SelfComparisonScreen = ({ route }) => {
  const { metrics } = route.params;

  return (
    <Box>
    <ScrollView>
      <VStack py={4} space={8}>
        <Heading fontSize="md" px={4}>
          We have found suitable results for you based on your choices.
        </Heading>
        {metrics.map((metric) => (
          <ComparisonWidget key={metric.title} metric={metric} />
        ))}
      </VStack>
    </ScrollView>
    </Box>
  );
};

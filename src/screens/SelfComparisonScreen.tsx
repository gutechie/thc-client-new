import { Box, Heading, ScrollView, VStack } from "native-base";
import { ComparisonWidget } from "../features/compare/ComparisonWidget";
import { OtherComparisonWidget } from "../features/compare/OtherComparisonWidget";

export const SelfComparisonScreen = ({ route }) => {
  console.log(route.params);
  const { metrics, competitors } = route.params;

  return (
    <Box>
      <ScrollView>
        <VStack py={4} space={8}>
          <Heading fontSize="md" px={4}>
            We have found suitable results for you based on your choices.
          </Heading>
          {metrics.map((metric) =>
            competitors.length > 0 ? (
              competitors.map((competitor) => (
                <OtherComparisonWidget
                  key={`${metric.title}-${competitor.id}`}
                  metric={metric}
                  competitor={competitor}
                />
              ))
            ) : (
              <ComparisonWidget key={metric.title} metric={metric} />
            )
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

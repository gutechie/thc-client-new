import { Box, HStack, Text } from "native-base";
import { useGetOthersDataQuery } from "./comparisonApi";
import { ErrorScreen, Loading } from "../../shared";
import { format } from "date-fns";
import { sentenceCase } from "../../helpers";
import { useWindowDimensions } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLine,
} from "victory-native";

export const OtherComparisonWidget = ({ metric, criteria, dateRange }) => {
  const windowWidth = useWindowDimensions().width;

  const searchQuery = new URLSearchParams({
    start_date: format(dateRange.startDate, "Y-MM-dd"),
    end_Date: format(dateRange.endDate, "Y-MM-dd"),
    metric_id: metric.id,
  });
  let criteriaKeys = [];

  criteria.forEach((criterion) => {
    criteriaKeys.push(criterion.name);
    searchQuery.append(criterion.name, criterion.value);
  });

  searchQuery.append("criteria", criteriaKeys.join(","));

  const { data, isLoading, isError, error } = useGetOthersDataQuery(
    searchQuery.toString()
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <ErrorScreen />;
  }

  return (
    <Box my={4}>
      <Text
        fontWeight={"bold"}
        color={"gray.700"}
        textTransform={"uppercase"}
        fontSize={"md"}
      >
        {sentenceCase(metric.title)}
      </Text>
      <HStack>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"sm"}>
          Others -{" "}
        </Text>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"sm"}>
          {sentenceCase(data.metric.aggregation_method)}{" "}
        </Text>
        <Text fontWeight={"semibold"} color={"black"} fontSize={"sm"}>
          {data.metric.other_aggregation_value.toFixed(2)}{" "}
        </Text>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"sm"}>
          {data.metric.converted_unit}
        </Text>
      </HStack>
      <HStack>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"sm"}>
          You -{" "}
        </Text>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"sm"}>
          {sentenceCase(data.metric.aggregation_method)}{" "}
        </Text>
        <Text fontWeight={"semibold"} color={"orange.500"} fontSize={"sm"}>
          {data.metric.self_aggregation_value.toFixed(2)}{" "}
        </Text>
        <Text fontWeight={"semibold"} color={"gray.500"} fontSize={"sm"}>
          {data.metric.converted_unit}
        </Text>
      </HStack>
      {data.metric.other_aggregation_value > 0 ? (
        <VictoryChart
          height={250}
          width={windowWidth}
          theme={VictoryTheme.grayscale}
          domainPadding={{ x: [20, 10], y: [0, 20] }}
        >
          <VictoryBar
            data={data.data.others}
            x="date"
            y="stats"
            barRatio={0.6}
            animate={{
              onEnter: {
                after: () => ({ _y: 0 }),
              },
            }}
          />
          <VictoryLine
            // labels={({ datum }) => `${datum[metric.title]}`}
            data={data.data.self}
            x="date"
            y="stats"
            interpolation={"cardinal"}
            style={{
              data: { stroke: "tomato", width: 10 },
            }}
            maxDomain={{ y: 100 }}
            animate
          />
          <VictoryAxis dependentAxis />
          <VictoryAxis
            tickFormat={(t) => format(new Date(t), "do")}
            style={{ tickLabels: { angle: 90, fontSize: 8, padding: 20 } }}
          />
        </VictoryChart>
      ) : (
        <Text textAlign={"center"} fontSize={"md"} my={"4"} color={"gray.400"}>
          Data not available
        </Text>
      )}
    </Box>
  );
};

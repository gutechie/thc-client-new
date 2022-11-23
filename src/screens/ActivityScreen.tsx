import { Box, FlatList, Heading, HStack, Text } from "native-base";
import { format } from "date-fns";
import { sentenceCase } from "../helpers";
import { useListUserActivitiesQuery } from "../features/activity/activityApi";
import { Loading } from "../shared/Loading";

export const ActivityScreen = () => {
  const queryParams = new URLSearchParams({
    "fields[activity_user]": "id,activity_date,tokens,activity_id",
    include: "metrics,activity",
    sort: "-activity_date",
  });

  const { data, isLoading, isError, error } = useListUserActivitiesQuery(
    queryParams.toString()
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Box>
        <Text>{error.error}</Text>
      </Box>
    );
  }

  function findMeasuringMetric(item) {
    return item.metrics.find(
      (metric) => metric.name === item.activity.measuring_metric
    );
  }

  return (
    <Box p={4}>
      <FlatList
        data={data.data}
        renderItem={({ item }) => (
          <Box my={"2"} p={4} bg={"white"} rounded={"md"} shadow={"6"}>
            <Heading fontSize={"sm"}>
              {sentenceCase(item.activity.name)}
            </Heading>
            <Text color={"muted.500"}>
              {format(new Date(item.activity_date), "PPP p")}
            </Text>
            <HStack justifyContent={"space-between"} mt={2}>
              <HStack space={2}>
                <Text>{sentenceCase(item.activity.measuring_metric)}</Text>
                <Text>
                  {findMeasuringMetric(item)?.stats}{" "}
                  {findMeasuringMetric(item)?.unit}
                </Text>
              </HStack>
              <HStack space={2}>
                <Text>Tokens</Text>
                <Text>{item.tokens}</Text>
              </HStack>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  );
};

export interface ActivityData {
  data: Array<{
    id: number;
    activity_date: Date | string;
    tokens: string;
    activity: {
      id: number;
      name: string;
      measuring_metric: string;
      measuring_unit: string;
      base_quantity: string;
      token: string;
    };
    metrics: Array<{
      id: number;
      name: string;
      unit: string;
      stats: number;
    }>;
  }>;
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
  meta: any;
}

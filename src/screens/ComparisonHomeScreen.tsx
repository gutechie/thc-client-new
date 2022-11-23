import { Fontisto } from "@expo/vector-icons";
import {
  Box,
  Button,
  Divider,
  Icon,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { ComparerSelector } from "../features/compare";
import { routes } from "../constants/routes";
import { MetricsSelector } from "../features/compare";
import { DateRangeSelector } from "../shared";
import { makeDateRanges } from "../helpers";

export const ComparisonHomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("currentWeek");
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const toast = useToast();

  const onMetricSelected = (metric) => {
    if (isIn(selectedMetrics, metric)) {
      setSelectedMetrics(
        selectedMetrics.filter((m) => m.title != metric.title)
      );
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const isIn = (selectedList, badge): boolean => {
    return selectedList.find((s) => s.id === badge.id);
  };

  function onCompare() {
    if (selectedMetrics.length === 0) {
      toast.show({
        description: "You have not selected any metrics for comparison.",
        title: "Metrics not selected",
        placement: "top",
      });
      return;
    }
    navigation.navigate(routes.SELF_COMPARER, {
      dateRange: selectedDate,
      metrics: selectedMetrics,
    });
  }

  return (
    <ScrollView>
      <Box py={4} px={5}>
        <VStack space={4} py={4} px={1}>
          <ComparerSelector
            currentScreenName={routes.SELF_COMPARER_HOME}
            navigation={navigation}
          />
          <DateRangeSelector
            selectedDateRange={selectedDate}
            onDateRangeSelected={(itemValue) => setSelectedDate(itemValue)}
          />
          <VStack space={4}>
            <VStack space={2}>
              <VStack space={1}>
                <Text fontSize="md">What do you want to compare?</Text>
                <Divider />
              </VStack>
              <MetricsSelector
                selectedMetrics={selectedMetrics}
                handleMetricSelected={onMetricSelected}
              />
            </VStack>
          </VStack>
        </VStack>
        <VStack space={4}>
          <Button color={"green"} paddingLeft={3}>
            Save my preference
          </Button>

          <Button colorScheme={"orange"} onPress={onCompare}>
            Compare now
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

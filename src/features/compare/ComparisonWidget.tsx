import { Alert, Box, CloseIcon, Heading, HStack, IconButton, Select, Text, VStack } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTheme
} from "victory-native";
import { Loading } from "../../shared/Loading";
import { useGetSelfPastDataQuery } from "./comparisonApi";

export const ComparisonWidget = ({ metric }) => {
  const [visualizationStyle, setVisualizationStyle] = useState("bar");
  const { width } = useWindowDimensions();
  const { data, isLoading, isError, error } = useGetSelfPastDataQuery(
    metric.id
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert w="100%" status={"error"}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {error.error}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" color="coolGray.600" />}
            />
          </HStack>
        </VStack>
      </Alert>
    );
  }

  console.log(data)

  return (
    <VStack space={4}>
      <Heading textAlign="center" size={"lg"} color={"orange.500"}>
        {metric.title}
      </Heading>

      <VStack space={4} p={4} bgColor={"white"} rounded={"lg"} shadow={"lg"}>
        <Box>
          <Select
            w={"full"}
            selectedValue={visualizationStyle}
            accessibilityLabel="Select Widget"
            placeholder={"Select Widget"}
            mt={1}
            mx={1}
            onValueChange={(itemValue) => setVisualizationStyle(itemValue)}
          >
            <Select.Item label="Bar Chart" value="bar" />
            <Select.Item label="Line Chart" value="line" />
            <Select.Item label="Table" value="table" />
          </Select>
        </Box>
        {["bar", "line"].includes(visualizationStyle) && (
          <Box w={"full"}>
            <VictoryChart
              height={200}
              width={width}
              padding={{ left: 40, right: 40, bottom: 24, top: 30 }}
              theme={VictoryTheme.material}
              domainPadding={{ x: 10 }}
            >
              {visualizationStyle == "bar" ? (
                <VictoryGroup offset={24}>
                  <VictoryBar
                    maxDomain={{ y: 100 }}
                    minDomain={{ y: 0 }}
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data}
                    x="day"
                    y="value"
                    // style={{
                    //   data: { fill: `#ea580c` },
                    // }}
                    animate={{
                      onEnter: {
                        after: () => ({ _y: 0 }),
                      },
                    }}
                  />
                </VictoryGroup>
              ) : (
                <VictoryGroup>
                  <VictoryLine
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data}
                    x="day"
                    y="value"
                    interpolation={"cardinal"}
                    style={{
                      data: { stroke: "tomato", width: 10 },
                    }}
                    maxDomain={{ y: 100 }}
                    animate
                  />
                  <VictoryScatter
                    data={data}
                    x="day"
                    y="value"
                    size={4}
                    style={{ data: { fill: "tomato" } }}
                  />
                </VictoryGroup>
              )}
              <VictoryAxis
                dependentAxis
                fixLabelOverlap
                style={{ grid: { stroke: "none" } }}
              />
              <VictoryAxis
                crossAxis
                fixLabelOverlap
                style={{ grid: { stroke: "none" } }}
              />
            </VictoryChart>
          </Box>
        )}
        {visualizationStyle == "table" && (
          <VStack w={"full"}>
            <HStack
              w={"full"}
              justifyContent={"space-between"}
              bgColor="orange.500"
              px={4}
              py={1}
            >
              <Heading color="orange.100" size={"sm"}>
                Day
              </Heading>
              <Heading color="orange.100" size={"sm"}>
                Value
              </Heading>
            </HStack>
            {data.map((d, i) => {
              return (
                <HStack
                  key={i}
                  w={"full"}
                  justifyContent={"space-between"}
                  px={4}
                  py={1}
                  bgColor={i % 2 != 0 ? "orange.50" : "white"}
                >
                  <Text color="muted.700" fontSize={"sm"}>
                    {d.day}
                  </Text>
                  <Text color="muted.700" fontSize={"sm"}>
                    {d.value}
                  </Text>
                </HStack>
              );
            })}
          </VStack>
        )}
      </VStack>
    </VStack>
  );
};

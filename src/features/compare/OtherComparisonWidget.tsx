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
import { useGetOthersDataQuery } from "./comparisonApi";

export const OtherComparisonWidget = ({ metric, competitor }) => {
  const [visualizationStyle, setVisualizationStyle] = useState("bar");
  const { width } = useWindowDimensions();
  const { data, isLoading, isError, error } = useGetOthersDataQuery(
    {metric: metric.id, scale: competitor.id}
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
  return (
    <VStack space={4}>
      <Heading textAlign="center" size={"lg"} color={"orange.500"}>
        {metric.title} - {competitor.title}
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
            <Select.Item label="Chart" value="bar" />
            <Select.Item label="Table" value="table" />
          </Select>
        </Box>
        {visualizationStyle == 'bar' && (
          <Box w={"full"}>
            <VictoryChart
              height={300}
              width={width}
              padding={{ left: 0, right: 40, bottom: 24, top: 30 }}
              theme={VictoryTheme.material}
              domainPadding={{ x: 10 }}
              // maxDomain={{ y: 100 }}
            >
                <VictoryGroup offset={24}>
                  <VictoryBar
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data.other}
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
                  <VictoryLine
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data.self}
                    x="day"
                    y="value"
                    interpolation={"monotoneX"}
                    style={{
                      data: { stroke: "teal", width: 10 },
                    }}
                    minDomain={{y:0}}
                    maxDomain={{y: 100}}
                    animate
                  />
                  <VictoryScatter
                    data={data.self}
                    x="day"
                    y="value"
                    size={4}
                    style={{ data: { fill: "teal" } }}
                  />
                </VictoryGroup>
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
                Others
              </Heading>
              <Heading color="orange.100" size={"sm"}>
                You
              </Heading>
            </HStack>
            {data.self.map((d, i) => {
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
                    {data.other[i].value}
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

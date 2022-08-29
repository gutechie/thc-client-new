import { Box, Heading, HStack, Select, Text, VStack } from "native-base";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from "victory-native";
import { useGetSelfPastDataQuery } from "./comparisonApi";

export const ComparisonWidget = ({ metric }) => {
  const [visualizationStyle, setVisualizationStyle] = useState("bar");
  const { height, width } = useWindowDimensions();
  const { data, isLoading, isError, error, refetch } = useGetSelfPastDataQuery(
    metric.id
  );

  const format = (date: Date) => {
    if (!date) {
      return "";
    }
    const month = date.getMonth() + 1;
    const day = date.getDate().toString();
    const year = date.getFullYear();

    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year.toString()}`;
  };

  if (isLoading) {
    return <Text>loading</Text>;
  }

  if (isError) {
    return <Text>{error.error}</Text>;
  }
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
              height={300}
              width={width}
              padding={{ left: 0, right: 40, bottom: 24, top: 20 }}
              theme={VictoryTheme.material}
              domainPadding={{ x: 10 }}
              maxDomain={{ y: 100 }}
            >
              {visualizationStyle == "bar" ? (
                <VictoryGroup offset={24}>
                  <VictoryBar
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data}
                    x="date"
                    y={metric.title}
                    // style={{
                    //   data: { fill: `#ea580c` },
                    // }}
                    animate={{
                      onEnter: {
                        after: () => ({ _y: 0 }),
                      },
                    }}
                  />
                  {/* <VictoryBar
                    labels={({ datum }) => `${datum[metric.title]}`}
                    data={dataB}
                    x="date"
                    y={metric.title}
                    animate={{duration: 200, easing: 'bounce'}}
                    style={{
                      data: { fill: `#005db4` },
                    }}
                    barRatio={0.8}
                    barWidth={24}
                  /> */}
                </VictoryGroup>
              ) : (
                <VictoryGroup>
                  {/* <VictoryBar
                    labels={({ datum }) => `${datum[metric.title]}`}
                    animate={{ onLoad: { duration: 500 } }}
                    data={data}
                    cornerRadius={0}
                    x="date"
                    y={metric.title}
                    style={{
                      data: { fill: `#ea580c` },
                    }}
                    barRatio={0.8}
                    barWidth={20}
                    domainPadding={{ x: 10 }}
                  /> */}
                  {/* <VictoryLine
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data}
                    x="date"
                    y={metric.title}
                    interpolation={"cardinal"}
                    style={{
                      data: { stroke: `#ea580c` },
                    }}
                  /> */}
                  {/* <VictoryScatter data={data} x="date" y={metric.title} size={4} style={{data: {fill: '#ea580c'}}} /> */}
                  <VictoryLine
                    // labels={({ datum }) => `${datum[metric.title]}`}
                    data={data}
                    x="date"
                    y={metric.title}
                    interpolation={"cardinal"}
                    style={{
                      data: { stroke: "tomato", width: 10 },
                    }}
                  />
                  <VictoryScatter
                    data={data}
                    x="date"
                    y={metric.title}
                    size={4}
                    style={{ data: { fill: "tomato" } }}
                  />
                  {/* <VictoryLine
                    labels={({ datum }) => `${datum[metric.title]}`}
                    data={dataB}
                    x='date'
                    y={metric.title}
                    interpolation={"basis"}
                    scale={{ x: "linear", y: "time" }}
                    style={{
                      data: { stroke: `#005db4` },
                    }}
                  /> */}
                </VictoryGroup>
              )}
              {/* <VictoryAxis
                dependentAxis
                fixLabelOverlap
                style={{ grid: { stroke: "none" } }}
              /> */}
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
                Date
              </Heading>
              <Heading color="orange.100" size={"sm"}>
                {metric.title}
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
                    {format(new Date(d.date))}
                  </Text>
                  <Text color="muted.700" fontSize={"sm"}>
                    {d[metric.title]}
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

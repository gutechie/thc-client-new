import { Box, Pressable, Text, useTheme } from "native-base";
import { useSharedValue } from "react-native-reanimated";
import { sentenceCase } from "../../helpers";

export const MultiSelectableBadges = ({ selectables, selected, onUpdate }) => {
  const { colors } = useTheme();
  const orange = colors.orange["500"];
  return (
    <Box flexDirection="row" alignItems="center" flexWrap={"wrap"}>
      {selectables.map((item, index) => (
        <Pressable key={index} onPress={() => onUpdate(item)}>
          <Box
            m={2}
            p={2}
            borderColor={orange}
            borderWidth={selected.find((s) => s.id == item.id) ? 0 : 1}
            rounded={"lg"}
            bgColor={selected.find((s) => s.id == item.id) && "orange.500"}
          >
            <Text
              color={
                selected.find((s) => s.id == item.id) ? "white" : "orange.500"
              }
            >
              {sentenceCase(item.title)}
            </Text>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};

import { Box, Pressable, Text } from "native-base";

export const MultiSelectableBadges = ({ selectables, selected, onUpdate }) => {
  return (
    <Box flexDirection="row" alignItems="center" flexWrap={"wrap"}>
      {selectables.map((item, index) => (
        <Pressable key={index} onPress={() => onUpdate(item)}>
          <Box
            m={2}
            p={2}
            borderColor={"orange.500"}
            borderWidth={selected.find((s) => s.id == item.id) ? 0 : 1}
            rounded={"lg"}
            bgColor={
              selected.find((s) => s.id == item.id) && "orange.500"
            }
          >
            <Text
              color={
                selected.find((s) => s.id == item.id)
                  ? "white"
                  : "orange.500"
              }
            >
              {item.title}
            </Text>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};

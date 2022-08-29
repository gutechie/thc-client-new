import { Box, Spinner } from "native-base";

export const Loading = () => {
  return (
    <Box flex={1} justifyContent={"center"} alignItems={"center"}>
      <Spinner size={"lg"} />
    </Box>
  );
};

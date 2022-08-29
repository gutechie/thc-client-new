import { Box, Input, VStack } from "native-base";
import { useState } from "react";

export const ListUsersScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <Box>
      <VStack>
        <Input
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </VStack>
    </Box>
  );
};

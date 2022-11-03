import {Box, Text} from "native-base";

export const ErrorScreen = () => {
    return <Box justifyContent={"center"} alignItems={"center"} flex={1}>
        <Text>Oops! Some error occurred</Text>
    </Box>
}
import {Box, Text} from "native-base";

export const OtherComparisonScreen = ({route}) => {
    const {dateRange, metrics, criteria} = route.params;
    console.log(dateRange, metrics, criteria)
    return <Box>
        <Text>Comparing...</Text>
    </Box>
}
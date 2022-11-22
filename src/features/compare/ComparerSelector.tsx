import {Box, Pressable, Text} from "native-base";
import {routes} from "../../constants/routes";

export const ComparerSelector = ({navigation, currentScreenName}) => {

    return <Box>
        <Box
            width={"full"}
            rounded={"full"}
            p={1}
            bgColor={"orange.100"}
        >
            <Box flexDirection={"row"}>
                <Pressable
                    style={{width: "50%"}}
                    onPress={() => navigation.navigate(routes.SELF_COMPARER_HOME)}
                >
                    <Text
                        fontSize="lg"
                        textAlign={"center"}
                        borderRadius={50}
                        p={2}
                        style={{
                            backgroundColor: currentScreenName === routes.SELF_COMPARER_HOME ? "white" : "transparent",
                        }}
                        color="#FF803F"
                    >
                        With myself
                    </Text>
                </Pressable>
                <Pressable
                    style={{width: "50%"}}
                    onPress={() => navigation.navigate(routes.OTHER_COMPARER_HOME)}
                >
                    <Text
                        fontSize="lg"
                        textAlign={"center"}
                        borderRadius={50}
                        p={2}
                        style={{
                            backgroundColor: currentScreenName === routes.OTHER_COMPARER_HOME ? "white" : "transparent",
                        }}
                        color="#FF803F"
                    >
                        With Others
                    </Text>
                </Pressable>
            </Box>
        </Box>
    </Box>

}
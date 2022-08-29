import { Dimensions } from "react-native";
import {
    Box,
    Text,
    HStack,
    ScrollView,
    Center,
    Image,
    Icon,
} from "native-base";
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';


export const ConnectSuccessShield = () => {

    const imgShild = require('../../assets/images/shield.png');

    return (
        <ScrollView>
            <Box py={12} px={5}>
                <HStack justifyContent={"space-between"}>
                    <Icon
                        as={FontAwesome}
                        name="angle-left"
                        size="6"
                        color="#000"
                    />
                    <Icon
                        as={Ionicons}
                        name="notifications-outline"
                        size="6"
                        color="#000"
                    />
                </HStack>

                <Center py={10} >
                    <Image
                        source={imgShild}
                        width={Dimensions.get('screen').width * 0.5}
                        height={Dimensions.get('screen').width * 0.5}
                        alt={'Shield'}
                    />
                </Center>

                <Box paddingX={5} py={5}>
                    <Text textAlign="center" fontSize="md" py={3} bold >Congratulations Ankit!</Text>
                    <Text textAlign="center" fontSize="md" color={"#8A8A8A"} >Your device app is successfully connected. Enjoy using The Healthy Comparison.</Text>
                </Box>

                <Box backgroundColor={'#FB8226'} alignItems={"center"} borderRadius={5} py={2} marginTop={20}>
                    <Icon
                        as={AntDesign}
                        name="arrowright"
                        size="30"
                        color="#fff"
                    />
                </Box>


            </Box>
        </ScrollView>
    );

}
import { FontAwesome5 } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { images } from "../constants/images";
import { logout, selectUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const CustomDrawer = (props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <VStack flex={1} p={4}>
      <DrawerContentScrollView {...props}>
        <HStack space={2} mb={4} alignItems={"center"}>
          <Avatar
            source={images.SIDEBAR_AVATAR}
            key-={"sidebar-avatar"}
            size={"md"}
          />
          <VStack space={1} justifyContent={"center"}>
            <Text fontWeight={"bold"}>{user.name}</Text>
            <Text fontSize={"xs"}>{user.email}</Text>
            <Button
              variant={"ghost"}
              onPress={() => dispatch(logout())}
              size="xs"
              colorScheme={"orange"}
            >
              Logout
            </Button>
          </VStack>
        </HStack>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Box>
        <Text
          fontSize={"md"}
          mx={3}
          pb={1}
          pt={2}
          fontWeight={"bold"}
          color={"gray.600"}
          borderTopWidth={1}
          borderColor={"gray.400"}
        >
          Follow us
        </Text>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={FontAwesome5}
                name="facebook"
                size={"lg"}
                color={"gray.600"}
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={FontAwesome5}
                name="instagram"
                size={"lg"}
                color={"gray.600"}
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={FontAwesome5}
                name="linkedin"
                size={"lg"}
                color={"gray.600"}
              />
            }
          />
          <IconButton
            icon={
              <Icon
                as={FontAwesome5}
                name="youtube"
                size={"lg"}
                color={"gray.600"}
              />
            }
          />
        </HStack>
      </Box>
    </VStack>
  );
};

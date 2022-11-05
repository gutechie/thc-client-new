import {Ionicons} from "@expo/vector-icons";
import * as Device from "expo-device";
import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    Text,
    Toast, useToast,
} from "native-base";
import {useState} from "react";
import {Pressable} from "react-native";
import {errors} from "../constants/errors";
import {images} from "../constants/images";
import {routes} from "../constants/routes";
import {LoginResponse, useLoginWithPasswordMutation, useLoginWithSocialMutation} from "../features/auth/authApi";
import {login} from "../features/auth/authSlice";
import {useAppDispatch} from "../hooks";
import {Loading} from "../shared";
import {authorize, prefetchConfiguration} from "react-native-app-auth";
import {config} from "../constants/config";

export const LoginWithPasswordScreen = ({navigation}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formState, setFormState] = useState({
        invalidInputs: [],
        errors: {
            email: "",
            password: "",
        },
    });

    const dispatch = useAppDispatch();
    const [loginWithPassword, {isLoading}] = useLoginWithPasswordMutation();
    const [loginWithSocial, {isLoading: isSocialLogin}] = useLoginWithSocialMutation();

    const authLogin = (response: LoginResponse) => {
        dispatch(
            login({
                authenticated: true,
                token: response.access_token,
                user: response.user,
            })
        );
    }

    const handleLogin = async () => {
        const currentState = {...formState};
        if (email === "") {
            currentState.invalidInputs.push("email");
            currentState.errors.email = errors.loginPage.email.required;
        }

        if (password === "") {
            currentState.invalidInputs.push("password");
            currentState.errors.password = errors.loginPage.password.required;
        }

        setFormState(currentState);

        if (formState.invalidInputs.length === 0) {
            try {
                const response = await loginWithPassword({
                    email,
                    password,
                    device_name: Device.deviceName,
                }).unwrap();
                authLogin(response)
            } catch (error) {
                Toast.show({
                    title: 'Something went wrong',
                    description: error.data ? error.data.message : error.error,
                    placement: 'bottom'
                });
            }
        }
    };

    if (isLoading || isSocialLogin) {
        return <Loading/>
    }

    const signInWithSocial = async (device) => {
        try {
            const result = await authorize(config[device]);
            console.log(result);
            const response = await loginWithSocial({provider: device, ...result}).unwrap();
            authLogin(response)
        } catch (error) {
            console.log(error)
            Toast.show({
                title: 'Something went wrong',
                description: error.data ? error.data.message : error.error,
                placement: 'bottom'
            });
        }
    };

    return (
        <Box py={8} px={12}>
            <Heading size={"md"} mb={4}>
                Login with Password
            </Heading>
            <Box>
                <Input
                    rounded={"md"}
                    borderColor={"orange.500"}
                    placeholder="Email address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                {formState.invalidInputs.includes("email") && (
                    <Text color={"red.500"} fontSize={"xs"}>
                        {formState.errors.email}
                    </Text>
                )}
            </Box>
            <Box mt={4} mb={2}>
                <Input
                    rounded={"md"}
                    borderColor={"orange.500"}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    InputRightElement={
                        <IconButton
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            icon={<Icon as={Ionicons} name={passwordVisible ? 'eye-off' : 'eye'}/>}
                            size={"md"}
                        />
                    }
                />
                {formState.invalidInputs.includes("password") && (
                    <Text color={"red.500"} fontSize={"xs"}>
                        {formState.errors.password}
                    </Text>
                )}
            </Box>
            <HStack justifyContent={"flex-end"} mb={4}>
                <Pressable onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)}>
                    <Text fontSize={"xs"} fontWeight={"semibold"}>
                        Forgot Password?
                    </Text>
                </Pressable>
            </HStack>
            <Button my={4} colorScheme={"orange"} onPress={handleLogin}>
                Login
            </Button>
            <HStack justifyContent={"center"} my={4} space={1}>
                <Text>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate(routes.REGISTER)}>
                    <Text fontWeight={"semibold"}>sign up here</Text>
                </Pressable>
            </HStack>
            <HStack justifyContent={"center"} space="2">
                <Pressable onPress={() => signInWithSocial('google')}>
                    <Image
                        key={"google"}
                        source={images.social.GOOGLE}
                        size={"xs"}
                        alt="google social icon"
                    />
                </Pressable>
                <Pressable onPress={() => signInWithSocial('strava')}>
                    <Image
                        key={"strava"}
                        source={images.social.STRAVA}
                        size={"xs"}
                        alt="strava social icon"
                    />
                </Pressable>
                {/*<Pressable onPress={() => signInWithSocial('google')}>*/}
                {/*    <Image*/}
                {/*        key={"fitbit"}*/}
                {/*        source={images.social.FITBIT}*/}
                {/*        size={"xs"}*/}
                {/*        alt="fitbit social icon"*/}
                {/*    />*/}
                {/*</Pressable>*/}
            </HStack>
        </Box>
    );
};

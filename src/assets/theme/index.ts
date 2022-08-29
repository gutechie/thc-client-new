import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      200: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      300: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
      },
      400: {
        normal: "Roboto-Regular",
        italic: "Roboto-Italic",
      },
      500: {
        normal: "Roboto-Medium",
      },
      600: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
      },
      700: {
        normal: "Roboto-Bold",
      },
      800: {
        normal: "Roboto-Bold",
        italic: "Roboto-BoldItalic",
      },
      900: {
        normal: "Roboto-Bold",
        italic: "Roboto-BoldItalic",
      },
    },
    Poppins: {
      100: {
        normal: "Poppins_100Thin",
        italic: "Poppins_100Thin_Italic",
      },
      200: {
        normal: "Poppins_200ExtraLight",
        italic: "Poppins_200ExtraLight_Italic",
      },
      300: {
        normal: "Poppins_300Light",
        italic: "Poppins_300Light_Italic",
      },
      400: {
        normal: "Poppins_400Regular",
        italic: "Poppins_400Regular_Italic",
      },
      500: {
        normal: "Poppins_500Medium",
        italic: "Poppins_500Medium_Italic",
      },
      600: {
        normal: "Poppins_600SemiBold",
        italic: "Poppins_600SemiBold_Italic",
      },
      700: {
        normal: "Poppins_700Bold",
        italic: "Poppins_700Bold_Italic"
      },
      800: {
        normal: "Poppins_800ExtraBold",
        italic: "Poppins_800ExtraBold_Italic",
      },
      900: {
        normal: "Poppins_900Black",
        italic: "Poppins_900Black_Italic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Roboto",
  },
});

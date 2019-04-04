import { StyleSheet, Platform } from "react-native";
import vars from './vars';

const AppFont = "Lato, Lucida Grande, Tahoma, Sans-Serif";
const AppBoldFont = "Lato, Lucida Grande, Tahoma, Sans-Serif";

const TextStyles = StyleSheet.create({
    appFont: {
        fontFamily: vars.appFont,
        lineHeight: vars.fontSizeStandard*1.3
    },
    boldFont: {
        fontFamily: vars.appBoldFont,
        lineHeight: vars.fontSizeStandard*1.6
    },

    //=============
    whiteText: {
        color: vars.white
    },
    blackText: {
        color: vars.textMain
    },
    shadowText: {
        color: vars.shadow
    },
    //=============
    normalWeigth: {
        fontWeight: "400"
    },
    highWeigth: {
        fontWeight: "600"
    },
    boldText: {
        fontWeight: 'bold',
    },

    //=============
    titleText: {
        fontFamily: AppBoldFont,
        fontSize: 19,
        fontWeight: Platform.OS === "ios" ? "700" : "400"
    },
    buttonTitle: {
        fontFamily: AppBoldFont,
        fontSize: 19,
        fontWeight: Platform.OS === "ios" ? "700" : "400",
        color: vars.white,
    },
    largeSize: {
        fontFamily: AppFont,
        fontSize: 18
    },
    mediumSize: {
        fontFamily: AppFont,
        fontSize: 16
    },
    smallSizeNumber: {
        fontFamily: AppFont,
        fontSize: 14
    },
    largeTitle: {
        fontFamily: AppFont,
        fontSize: 24,
        fontWeight: "bold",
        color: vars.white,
    },
    alignCenterText: {
        textAlign: "center"
    }
});

export { AppFont, AppBoldFont, TextStyles }
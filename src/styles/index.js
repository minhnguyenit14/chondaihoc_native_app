import { StyleSheet } from "react-native";
import vars from "./vars";
import { 
    caculateAppMaxHeight, 
    caculateAppMaxWidth, 
    caculateAppMinHeight, 
    screenHeight, 
    screenWidth 
} from "./responsiveFunction"

import { AppFont, TextStyles } from "./text"

const ViewStyles = StyleSheet.create({
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flexCenterVertical: {
    display: "flex",
    justifyContent: "center"
  },
  flexCenterHorrizontal: {
    display: "flex",
    alignItems: "center"
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  container: {
    width: "100%",
    height: "100%"
  }
});

const InputStyles = StyleSheet.create({

  inputContainer: {
    backgroundColor: vars.white,
    borderRadius: vars.borderRadius,
    height: screenHeight * 0.08,
    minHeight: caculateAppMinHeight(),
    maxHeight: caculateAppMaxHeight(),
    marginBottom: 8,
    paddingTop: 3,
    width: "100%"
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: vars.borderColor,
    marginTop: vars.padding/2,
    marginBottom: vars.padding/2,
    width: "100%",
    borderRadius: vars.borderRadius,
    height: screenHeight * 0.08,
    minHeight: caculateAppMinHeight(),
    maxHeight: caculateAppMaxHeight(),
    paddingLeft: vars.padding,
    paddingRight: vars.padding,
    backgroundColor: vars.white
  },
  listRowContainer: {
    backgroundColor: "transparent",
    paddingTop: 15,
    marginBottom: 8,
    width: "100%",
  }
});




export {
  ViewStyles,
  TextStyles,
  vars,
  InputStyles,
  caculateAppMaxWidth,
  caculateAppMaxHeight,
  caculateAppMinHeight,
  AppFont,
  screenHeight, screenWidth
};

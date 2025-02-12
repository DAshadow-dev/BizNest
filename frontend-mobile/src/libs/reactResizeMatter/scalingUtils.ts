import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

//chiều rộng của điện thoại trong figma
const guidelineBaseWidth= 393;

//chiều cao của điện thoại trong figma
const guidelineBaseHeight = 852;

//scale đối với width
const scale = (size: number): number => (width / guidelineBaseWidth) * size;

//verticalScale đối với height
const verticalScale = (size: number): number => (height/ guidelineBaseHeight) * size;

//moderateScale đối với fontSize;
const moderateScale = (size: number, factor: number = 0.5): number =>
    size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale}
import {scale} from '@libs/reactResizeMatter/scalingUtils';
import * as React from 'react';
import Svg, {Circle, Ellipse, Rect} from 'react-native-svg';

export default function IconAction(props: {size?: number; color?: string}) {
  const {size = 24, color = '#ffffff'} = props;
  return (
    <Svg width={scale(size)} height={scale(size)} viewBox="0 0 24 24" fill="none">
      <Rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke={color} />
      <Ellipse cx="11.9997" cy="6.16667" rx="1.66667" ry="1.66667" fill={color} />
      <Circle cx="11.9997" cy="12" r="1.66667" fill={color} />
      <Ellipse cx="11.9997" cy="17.8334" rx="1.66667" ry="1.66667" fill={color} />
    </Svg>
  );
}

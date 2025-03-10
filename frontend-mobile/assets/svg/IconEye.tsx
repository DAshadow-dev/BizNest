import {scale, verticalScale} from '@libs/reactResizeMatter/scalingUtils';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function IconEye(props: {width?: number; height?: number; color?: string}) {
  const {width = 14, height = 9, color = '#707070'} = props;
  return (
    <Svg width={scale(width)} height={verticalScale(height)} viewBox="0 0 13.83 9.323">
      <Path
        id="Icon_ionic-md-eye"
        data-name="Icon ionic-md-eye"
        d="M9.165,7.383A7.436,7.436,0,0,0,2.25,12.044a7.46,7.46,0,0,0,13.83,0A7.436,7.436,0,0,0,9.165,7.383Zm0,7.77a3.109,3.109,0,1,1,3.143-3.109A3.134,3.134,0,0,1,9.165,15.153Zm0-4.973a1.865,1.865,0,1,0,1.886,1.865A1.881,1.881,0,0,0,9.165,10.18Z"
        transform="translate(-2.25 -7.383)"
        fill={color}
      />
    </Svg>
  );
}

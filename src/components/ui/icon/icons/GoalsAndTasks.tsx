import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './icon-types';

export const GoalsAndTasks: React.FC<IconProps> = ({
  height,
  width,
  isActive,
  ...props
}) => {
  return (
    <Svg
      fill={isActive ? '#926bff' : '#000000'}
      height={height}
      width={width}
      viewBox="0 0 48 48"
      {...props}
    >
      <Path d="M8 21c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM8 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 24.33c-1.47 0-2.67 1.19-2.67 2.67s1.2 2.67 2.67 2.67 2.67-1.19 2.67-2.67-1.2-2.67-2.67-2.67zM14 38h28v-4H14v4zm0-12h28v-4H14v4zm0-16v4h28v-4H14z" />
    </Svg>
  );
};

export default GoalsAndTasks;

import React from 'react';
import { SvgProps } from 'react-native-svg';
import * as Icons from './icons';

type IconProps = {
  name: IconName;
  isActive?: boolean;
} & SvgProps;

export type IconName = keyof typeof Icons;

export const Icon: React.FC<IconProps> = ({
  name,
  height = '30px',
  width = '30px',
  isActive = false,
  ...props
}) => {
  const IconSVG = Icons[name];

  if (!IconSVG) {
    return null; // or return a placeholder/error icon
  }

  return (
    <IconSVG isActive={isActive} height={height} width={width} {...props} />
  );
};

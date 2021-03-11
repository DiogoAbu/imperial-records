import React, { FC } from 'react';
import { TextProps } from 'react-native';

import Animated from 'react-native-reanimated';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { useTheme } from '@react-navigation/native';

import config from '!/assets/fonts/star-wars-icons-config.json';

const Icon = createIconSetFromIcoMoon(config);

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface Props extends TextProps {
  name: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

const StarWarsIcon: FC<Props> = ({ color, size, animated, ...rest }) => {
  const { colors } = useTheme();

  const Component = animated ? AnimatedIcon : Icon;

  return <Component color={color ?? colors.text} size={size ?? 40} {...rest} />;
};

export default StarWarsIcon;

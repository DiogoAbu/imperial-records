import React, { FC } from 'react';
import { Animated, StyleSheet, Text as NativeText, TextProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

import useFontFamily from '!/hooks/use-font-family';

const AnimatedText = Animated.createAnimatedComponent(NativeText);

interface Props extends TextProps {
  animated?: boolean;
}

const Text: FC<Props> = ({ children, style, animated, ...rest }) => {
  const { colors } = useTheme();
  const { fontFamily } = useFontFamily();

  const Component = animated ? AnimatedText : NativeText;

  return (
    <Component {...rest} style={[{ fontFamily, color: colors.text }, styles.text, style]}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default Text;

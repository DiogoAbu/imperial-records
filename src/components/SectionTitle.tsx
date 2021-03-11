import React, { FC } from 'react';
import { StyleSheet, TextProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { constants } from '!/services/theme';

import Text from './Text';

const SectionTitle: FC<TextProps> = ({ style, children, ...rest }) => {
  const { colors } = useTheme();

  return (
    <Text {...rest} style={[styles.sectionTitle, { color: colors.primary }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    padding: constants.smallGrid,
    paddingTop: constants.grid,
  },
});

export default SectionTitle;

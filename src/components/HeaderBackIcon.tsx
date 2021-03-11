import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useTheme } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import FadeIcon from './FadeIcon';
import { MIN_HEIGHT } from './ResourceCard';

interface Props {
  visible: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const HeaderBackIcon: FC<Props> = ({ visible, onPress, containerStyle }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.headerBackIconTouchable, containerStyle]}>
      <HeaderBackButton
        backImage={() => <FadeIcon color={colors.primary} name='chevron-left' visible={visible} />}
        labelVisible={false}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackIconTouchable: {
    position: 'absolute',
    left: 0,
    top: getStatusBarHeight(),
    height: MIN_HEIGHT - getStatusBarHeight(),
    justifyContent: 'center',
  },
});

export default HeaderBackIcon;

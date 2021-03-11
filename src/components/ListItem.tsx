import React, { FC } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import Text from '!/components/Text';
import { constants } from '!/services/theme';

import Pressable from './Pressable';

interface Props {
  style?: StyleProp<ViewStyle>;
  left?: () => JSX.Element;
  leftStyle?: StyleProp<ViewStyle>;
  right?: () => JSX.Element;
  rightStyle?: StyleProp<ViewStyle>;
  center?: () => JSX.Element;
  centerStyle?: StyleProp<ViewStyle>;
  title: (() => JSX.Element) | string;
  titleStyle?: StyleProp<TextStyle>;
  description?: (() => JSX.Element) | string;
  descriptionStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const ListItem: FC<Props> = ({
  style,
  left,
  leftStyle,
  right,
  rightStyle,
  center,
  centerStyle,
  title,
  titleStyle,
  description,
  descriptionStyle,
  onPress,
}) => {
  return (
    <Pressable androidRipple={{ borderless: false }} onPress={onPress} style={[styles.container, style]}>
      {left ? <View style={[styles.leftContainer, leftStyle]}>{left()}</View> : null}

      <View style={[styles.centerContainer, centerStyle]}>
        {center ? (
          center()
        ) : typeof title === 'string' ? (
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        ) : (
          title?.()
        )}

        {typeof description === 'string' ? (
          <Text style={descriptionStyle}>{description}</Text>
        ) : (
          description?.()
        )}
      </View>

      {right ? <View style={[styles.rightContainer, rightStyle]}>{right()}</View> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    minHeight: 64,
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    paddingLeft: constants.grid,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: constants.grid,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    paddingRight: constants.grid,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListItem;

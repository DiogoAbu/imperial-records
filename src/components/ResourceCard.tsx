import React, { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { constants } from '!/services/theme';
import { ResourceName } from '!/types';
import capitalize from '!/utils/capitalize';
import requireResourceImage from '!/utils/require-resource-image';

import Text from './Text';

export const MAX_HEIGHT = 224;
export const MIN_HEIGHT = 84;
export const SCROLL_DISTANCE = MAX_HEIGHT - MIN_HEIGHT;

interface Props {
  resource: ResourceName;
  scrollY?: Animated.Value;
}

const ResourceCard: FC<Props> = ({ resource, scrollY }) => {
  const titleTranslateX = scrollY
    ? scrollY.interpolate({
        inputRange: [0, SCROLL_DISTANCE],
        outputRange: [0, 56],
        extrapolate: 'clamp',
      })
    : 0;

  return (
    <FastImage source={requireResourceImage(resource)} style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <Text
          animated
          style={[
            styles.title,
            {
              transform: [{ translateX: titleTranslateX }] as any,
            },
          ]}
        >
          {capitalize(resource)}
        </Text>
      </LinearGradient>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'flex-end',
    height: MAX_HEIGHT,
  },
  gradient: {
    justifyContent: 'center',
    height: MIN_HEIGHT - getStatusBarHeight(),
  },
  title: {
    paddingLeft: constants.grid,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default ResourceCard;

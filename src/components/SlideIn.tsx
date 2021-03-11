import React, { FC, useEffect } from 'react';

import Animated, { Easing, timing, Value } from 'react-native-reanimated';

import useConst from '!/hooks/use-const';

interface Props {
  direction?: 'up' | 'right' | 'down' | 'left';
}

const SLIDE_AMOUNT = 50;

const SlideIn: FC<Props> = ({ children, direction }) => {
  const value = useConst(() => new Value(0));

  const vertical = direction === 'up' || direction === 'down';
  const initialPos = SLIDE_AMOUNT * (direction === 'up' || direction === 'left' ? -1 : 1);

  useEffect(() => {
    timing(value, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }, [value]);

  const animValue = value.interpolate({
    inputRange: [0, 1],
    outputRange: [initialPos, 0],
  });

  let transform: Animated.AnimatedTransform;
  if (vertical) {
    transform = [{ translateY: animValue }];
  } else {
    transform = [{ translateX: animValue }];
  }

  return <Animated.View style={{ opacity: value, transform }}>{children}</Animated.View>;
};

SlideIn.defaultProps = {
  direction: 'right',
};

export default SlideIn;

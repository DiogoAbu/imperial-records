import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { concat } from 'react-native-reanimated';

import { constants } from '!/services/theme';
import { loop } from '!/utils/loop';

import StarWarsIcon from './StarWarsIcon';

interface Props {
  size?: number;
}

const Loading: FC<Props> = ({ size }) => {
  const rotateZ = loop({ value: 0, toValue: 360 });

  return (
    <View style={styles.container}>
      <StarWarsIcon
        animated
        name='lightsaber'
        size={size ?? 32}
        style={{
          transform: [{ rotateZ: concat(rotateZ, 'deg') }] as any,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: constants.bigGrid,
  },
});

export default Loading;

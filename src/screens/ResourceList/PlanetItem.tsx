import React from 'react';
import { ListRenderItem } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import usePress from '!/hooks/use-press';
import { MainNavigationProp, Planet } from '!/types';
import capitalize from '!/utils/capitalize';

const PlanetItem: ListRenderItem<Planet> = ({ item }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();

  const handleGoToDetails = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { resource: 'planets', result: item });
    });
  });

  return (
    <ListItem
      description={`${capitalize(item.climate, true)} / ${capitalize(item.terrain, true)}`}
      descriptionStyle={{ color: colors.primary }}
      onPress={handleGoToDetails}
      right={() => <Icon color={colors.primary} name='chevron-right' />}
      title={capitalize(item.name)}
    />
  );
};

export default PlanetItem;

import React from 'react';
import { ListRenderItem } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import usePress from '!/hooks/use-press';
import { MainNavigationProp, Starship } from '!/types';
import capitalize from '!/utils/capitalize';

const StarshipItem: ListRenderItem<Starship> = ({ item }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();

  const handleGoToDetails = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { resource: 'starships', result: item });
    });
  });

  return (
    <ListItem
      description={capitalize(item.manufacturer, true)}
      descriptionStyle={{ color: colors.primary }}
      onPress={handleGoToDetails}
      right={() => <Icon color={colors.primary} name='chevron-right' />}
      title={item.name}
    />
  );
};

export default StarshipItem;

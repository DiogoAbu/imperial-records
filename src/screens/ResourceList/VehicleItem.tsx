import React from 'react';
import { ListRenderItem } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import usePress from '!/hooks/use-press';
import { MainNavigationProp, Vehicle } from '!/types';
import capitalize from '!/utils/capitalize';

const VehicleItem: ListRenderItem<Vehicle> = ({ item }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();

  const handleGoToDetails = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { resource: 'vehicles', result: item });
    });
  });

  return (
    <ListItem
      description={capitalize(item.manufacturer)}
      descriptionStyle={{ color: colors.primary }}
      onPress={handleGoToDetails}
      right={() => <Icon color={colors.primary} name='chevron-right' />}
      title={item.name}
    />
  );
};

export default VehicleItem;

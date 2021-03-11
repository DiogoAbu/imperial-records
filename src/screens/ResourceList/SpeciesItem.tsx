import React from 'react';
import { ListRenderItem } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import usePress from '!/hooks/use-press';
import { MainNavigationProp, Species } from '!/types';
import capitalize from '!/utils/capitalize';

const SpeciesItem: ListRenderItem<Species> = ({ item }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();

  const handleGoToDetails = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { resource: 'species', result: item });
    });
  });

  return (
    <ListItem
      description={`${capitalize(item.classification)} / ${capitalize(item.designation)}`}
      descriptionStyle={{ color: colors.primary }}
      onPress={handleGoToDetails}
      right={() => <Icon color={colors.primary} name='chevron-right' />}
      title={item.name}
    />
  );
};

export default SpeciesItem;

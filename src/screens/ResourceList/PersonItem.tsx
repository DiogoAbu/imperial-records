import React from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import StarWarsIcon from '!/components/StarWarsIcon';
import Text from '!/components/Text';
import usePress from '!/hooks/use-press';
import { constants } from '!/services/theme';
import { MainNavigationProp, People } from '!/types';

const PersonItem: ListRenderItem<People> = ({ item }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();

  const handleGoToDetails = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Details', { resource: 'people', result: item });
    });
  });

  return (
    <ListItem
      description={() => (
        <View style={[{ paddingTop: constants.smallGrid }, styles.detailAmountContainer]}>
          <View style={styles.detailAmountContainer}>
            <StarWarsIcon name='walker' size={18} />
            <Text style={styles.detailAmount}>{item.vehicles.length}</Text>
          </View>

          <View style={styles.detailAmountContainer}>
            <StarWarsIcon name='millenium-falcon' size={18} />
            <Text style={styles.detailAmount}>{item.starships.length}</Text>
          </View>

          <View style={styles.detailAmountContainer}>
            <Icon name='movie-roll' size={22} />
            <Text style={styles.detailAmount}>{item.films.length}</Text>
          </View>
        </View>
      )}
      onPress={handleGoToDetails}
      right={() => <Icon color={colors.primary} name='chevron-right' />}
      title={item.name}
    />
  );
};

const styles = StyleSheet.create({
  detailAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailAmount: {
    paddingLeft: constants.smallGrid,
    paddingRight: constants.grid,
  },
});

export default PersonItem;

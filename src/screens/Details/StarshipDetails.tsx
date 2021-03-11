import React, { FC } from 'react';
import { View } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import GetOneAsync from '!/components/GetOneAsync';
import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import SectionTitle from '!/components/SectionTitle';
import Separator from '!/components/Separator';
import { constants } from '!/services/theme';
import { MainNavigationProp, ResourceOne, Starship } from '!/types';
import capitalize from '!/utils/capitalize';
import getNumberFromUrl from '!/utils/get-number-from-url';
import pushNewDetailsScreen from '!/utils/push-new-details-screen';

import styles from './styles';

interface Props {
  result: Starship;
  shouldLoad: boolean;
}

const StarshipDetails: FC<Props> = ({ result, shouldLoad }) => {
  const navigation = useNavigation<MainNavigationProp<'Details'>>();
  const { colors } = useTheme();

  return (
    <>
      <ListItem
        centerStyle={styles.itemCenter}
        description='name'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={result.name}
      />

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='model'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.model, true)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='manufacturer'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.manufacturer, true)}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='class'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.starship_class, true)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='max speed'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={parseFloat(result.max_atmosphering_speed).toLocaleString()}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='Megalight per hour'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={parseFloat(result.MGLT).toLocaleString()}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='hyperdrive rating'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={parseFloat(result.hyperdrive_rating).toLocaleString()}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='length'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={parseFloat(result.length).toLocaleString()}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='cargo capacity'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.cargo_capacity)}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='cost in credits'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={
            result.cost_in_credits === 'unknown'
              ? 'Unknown'
              : parseFloat(result.cost_in_credits).toLocaleString()
          }
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='consumables'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.consumables)}
        />
      </View>

      <View style={[styles.rowContainer, { marginBottom: constants.smallGrid }]}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='crew'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={parseFloat(result.crew).toLocaleString()}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='passengers'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={parseFloat(result.passengers).toLocaleString()}
        />
      </View>

      {!shouldLoad ? null : (
        <>
          {result.pilots.length ? (
            <>
              <Separator />
              <SectionTitle>Pilots</SectionTitle>
            </>
          ) : null}
          {result.pilots.map((each) => (
            <GetOneAsync id={getNumberFromUrl(each)} key={each} resource='people'>
              {(data: ResourceOne['people']) => (
                <ListItem
                  left={() => <Icon name='face' size={24} />}
                  onPress={pushNewDetailsScreen('Details', 'people', data, navigation)}
                  right={() => <Icon color={colors.primary} name='chevron-right' size={30} />}
                  title={data.name}
                />
              )}
            </GetOneAsync>
          ))}

          {result.films.length ? (
            <>
              <Separator />
              <SectionTitle>Films</SectionTitle>
            </>
          ) : null}
          {result.films.map((each) => (
            <GetOneAsync id={getNumberFromUrl(each)} key={each} resource='films'>
              {(data: ResourceOne['films']) => (
                <ListItem
                  left={() => <Icon name='movie-roll' size={30} />}
                  onPress={pushNewDetailsScreen('Details', 'films', data, navigation)}
                  right={() => <Icon color={colors.primary} name='chevron-right' size={30} />}
                  title={data.title}
                />
              )}
            </GetOneAsync>
          ))}
        </>
      )}
    </>
  );
};

export default StarshipDetails;

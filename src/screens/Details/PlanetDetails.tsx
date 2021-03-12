import React, { FC } from 'react';
import { View } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import GetOneAsync from '!/components/GetOneAsync';
import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import SectionTitle from '!/components/SectionTitle';
import Separator from '!/components/Separator';
import { constants } from '!/services/theme';
import { MainNavigationProp, Planet, ResourceOne } from '!/types';
import capitalize from '!/utils/capitalize';
import getNumberFromUrl from '!/utils/get-number-from-url';
import pushNewDetailsScreen from '!/utils/push-new-details-screen';

import styles from './styles';

interface Props {
  result: Planet;
  shouldLoad: boolean;
}

const PlanetDetails: FC<Props> = ({ result, shouldLoad }) => {
  const navigation = useNavigation<MainNavigationProp<'Details'>>();
  const { colors } = useTheme();

  return (
    <>
      <ListItem
        centerStyle={styles.itemCenter}
        description='name'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={capitalize(result.name)}
      />

      <ListItem
        centerStyle={styles.itemCenter}
        description='population'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={result.population === 'unknown' ? 'Unknown' : parseFloat(result.population).toLocaleString()}
      />

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='diameter'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.diameter === 'unknown' ? 'Unknown' : parseFloat(result.diameter).toLocaleString()}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='gravity'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.gravity)}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='climate'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.climate, true)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='terrain'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.terrain, true)}
        />
      </View>

      <View style={[styles.rowContainer, { marginBottom: constants.smallGrid }]}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='rotation period'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={
            result.rotation_period === 'unknown'
              ? 'Unknown'
              : parseFloat(result.rotation_period).toLocaleString()
          }
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='orbital period'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={
            result.orbital_period === 'unknown'
              ? 'Unknown'
              : parseFloat(result.orbital_period).toLocaleString()
          }
        />
      </View>

      {!shouldLoad ? null : (
        <>
          {result.residents.length ? (
            <>
              <Separator />
              <SectionTitle>Residents</SectionTitle>
            </>
          ) : null}
          {result.residents.map((each) => (
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

export default PlanetDetails;

import React, { FC } from 'react';
import { View } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import GetOneAsync from '!/components/GetOneAsync';
import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import SectionTitle from '!/components/SectionTitle';
import Separator from '!/components/Separator';
import StarWarsIcon from '!/components/StarWarsIcon';
import { constants } from '!/services/theme';
import { MainNavigationProp, People, ResourceOne } from '!/types';
import capitalize from '!/utils/capitalize';
import getNumberFromUrl from '!/utils/get-number-from-url';
import pushNewDetailsScreen from '!/utils/push-new-details-screen';

import styles from './styles';

interface Props {
  result: People;
  shouldLoad: boolean;
}

const PersonDetails: FC<Props> = ({ result, shouldLoad }) => {
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
          description='birth year'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.birth_year}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='gender'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.gender)}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='height'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.height}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='mass'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.mass}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='skin'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.skin_color)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='hair'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.hair_color)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='eye'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.eye_color)}
        />
      </View>

      <Separator style={{ marginTop: constants.smallGrid }} />

      {!shouldLoad ? null : (
        <>
          {result.homeworld ? (
            <GetOneAsync id={getNumberFromUrl(result.homeworld)} resource='planets'>
              {(data: ResourceOne['planets']) => (
                <ListItem
                  description='homeworld'
                  descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
                  left={() => <Icon name='earth' size={30} />}
                  onPress={pushNewDetailsScreen('Details', 'planets', data, navigation)}
                  right={() => <Icon color={colors.primary} name='chevron-right' size={30} />}
                  title={data.name}
                />
              )}
            </GetOneAsync>
          ) : null}

          {result.species.length ? (
            <>
              <Separator />
              <SectionTitle>Species</SectionTitle>
            </>
          ) : null}
          {result.species.map((each) => (
            <GetOneAsync id={getNumberFromUrl(each)} key={each} resource='species'>
              {(data: ResourceOne['species']) => (
                <ListItem
                  left={() => <Icon name='face' size={24} />}
                  onPress={pushNewDetailsScreen('Details', 'species', data, navigation)}
                  right={() => <Icon color={colors.primary} name='chevron-right' size={30} />}
                  title={data.name}
                />
              )}
            </GetOneAsync>
          ))}

          {result.vehicles.length ? (
            <>
              <Separator />
              <SectionTitle>Vehicles</SectionTitle>
            </>
          ) : null}
          {result.vehicles.map((each) => (
            <GetOneAsync id={getNumberFromUrl(each)} key={each} resource='vehicles'>
              {(data: ResourceOne['vehicles']) => (
                <ListItem
                  left={() => <StarWarsIcon name='walker' size={24} />}
                  onPress={pushNewDetailsScreen('Details', 'vehicles', data, navigation)}
                  right={() => <Icon color={colors.primary} name='chevron-right' size={30} />}
                  title={data.name}
                />
              )}
            </GetOneAsync>
          ))}

          {result.starships.length ? (
            <>
              <Separator />
              <SectionTitle>Starships</SectionTitle>
            </>
          ) : null}
          {result.starships.map((each) => (
            <GetOneAsync id={getNumberFromUrl(each)} key={each} resource='starships'>
              {(data: ResourceOne['starships']) => (
                <ListItem
                  left={() => <StarWarsIcon name='millenium-falcon' size={18} />}
                  onPress={pushNewDetailsScreen('Details', 'starships', data, navigation)}
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

export default PersonDetails;

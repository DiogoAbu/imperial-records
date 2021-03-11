import React, { FC } from 'react';
import { View } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';

import GetOneAsync from '!/components/GetOneAsync';
import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import SectionTitle from '!/components/SectionTitle';
import Separator from '!/components/Separator';
import { constants } from '!/services/theme';
import { MainNavigationProp, ResourceOne, Species } from '!/types';
import capitalize from '!/utils/capitalize';
import getNumberFromUrl from '!/utils/get-number-from-url';
import pushNewDetailsScreen from '!/utils/push-new-details-screen';

import styles from './styles';

interface Props {
  result: Species;
  shouldLoad: boolean;
}

const SpeciesDetails: FC<Props> = ({ result, shouldLoad }) => {
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

      <ListItem
        centerStyle={styles.itemCenter}
        description='language'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={result.language}
      />

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='classification'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.classification)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='designation'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.designation)}
        />
      </View>

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='average lifespan'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={capitalize(result.average_lifespan)}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='average height'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.average_height}
        />
      </View>

      <ListItem
        centerStyle={styles.itemCenter}
        description='skin colors'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={capitalize(result.skin_colors, true)}
      />
      <ListItem
        centerStyle={styles.itemCenter}
        description='hair colors'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={capitalize(result.hair_colors, true)}
      />
      <ListItem
        centerStyle={styles.itemCenter}
        description='eye colors'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={capitalize(result.eye_colors, true)}
      />

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

          {result.people.length ? (
            <>
              <Separator />
              <SectionTitle>People</SectionTitle>
            </>
          ) : null}
          {result.people.map((each) => (
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

export default SpeciesDetails;

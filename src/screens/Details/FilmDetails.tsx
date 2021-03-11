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
import { Film, MainNavigationProp, ResourceOne } from '!/types';
import getNumberFromUrl from '!/utils/get-number-from-url';
import pushNewDetailsScreen from '!/utils/push-new-details-screen';

import styles from './styles';

interface Props {
  result: Film;
  shouldLoad: boolean;
}

const FilmDetails: FC<Props> = ({ result, shouldLoad }) => {
  const navigation = useNavigation<MainNavigationProp<'Details'>>();
  const { colors } = useTheme();

  return (
    <>
      <ListItem
        centerStyle={styles.itemCenter}
        description='title'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={result.title}
      />

      <View style={styles.rowContainer}>
        <ListItem
          centerStyle={styles.itemCenter}
          description='episode'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.episode_id.toString()}
        />
        <ListItem
          centerStyle={styles.itemCenter}
          description='release date'
          descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
          style={styles.rowItem}
          title={result.release_date}
        />
      </View>

      <ListItem
        centerStyle={styles.itemCenter}
        description='director'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={result.director}
      />

      <ListItem
        centerStyle={styles.itemCenter}
        description='producer'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        title={result.producer}
      />

      <ListItem
        centerStyle={styles.itemCenter}
        description='opening crawl'
        descriptionStyle={[styles.itemDescription, { color: colors.primary }]}
        style={{ marginBottom: constants.smallGrid }}
        title={result.opening_crawl}
      />

      {!shouldLoad ? null : (
        <>
          {result.characters.length ? (
            <>
              <Separator />
              <SectionTitle>Characters</SectionTitle>
            </>
          ) : null}
          {result.characters.map((each) => (
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

          {result.planets.length ? (
            <>
              <Separator />
              <SectionTitle>Planets</SectionTitle>
            </>
          ) : null}
          {result.planets.map((each) => (
            <GetOneAsync id={getNumberFromUrl(each)} key={each} resource='planets'>
              {(data: ResourceOne['planets']) => (
                <ListItem
                  left={() => <Icon name='earth' size={30} />}
                  onPress={pushNewDetailsScreen('Details', 'planets', data, navigation)}
                  right={() => <Icon color={colors.primary} name='chevron-right' size={30} />}
                  title={data.name}
                />
              )}
            </GetOneAsync>
          ))}
        </>
      )}
    </>
  );
};

export default FilmDetails;

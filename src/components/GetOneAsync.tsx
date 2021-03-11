import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useTheme } from '@react-navigation/native';

import { getFilm, getPerson, getPlanet, getSpecies, getStarship, getVehicle } from '!/services/swapi';
import { constants } from '!/services/theme';
import { ResourceName, ResourceOne } from '!/types';

interface Props {
  resource: ResourceName;
  id: number;
  children(props: ResourceOne[ResourceName] | null): JSX.Element;
}

const GetOneAsync: FC<Props> = ({ resource, id, children }) => {
  const { colors } = useTheme();

  const [response, setResponse] = useState<ResourceOne[typeof resource] | null>(null);

  useEffect(() => {
    const requestData = async () => {
      let getRequest;
      switch (resource) {
        case 'films':
          getRequest = getFilm;
          break;
        case 'species':
          getRequest = getSpecies;
          break;
        case 'starships':
          getRequest = getStarship;
          break;
        case 'vehicles':
          getRequest = getVehicle;
          break;
        case 'people':
          getRequest = getPerson;
          break;
        case 'planets':
        default:
          getRequest = getPlanet;
          break;
      }

      const res = await getRequest(id);

      requestAnimationFrame(() => {
        setResponse(res);
      });
    };

    void requestData();
  }, [id, resource]);

  if (!response) {
    return (
      <SkeletonContent
        boneColor={colors.card}
        containerStyle={styles.container}
        highlightColor={colors.primary}
        isLoading
        layout={[
          { key: 'leftIcon', width: 32, height: 32, borderRadius: 16 },
          {
            key: 'title',
            width: 192,
            height: 12,
            marginLeft: constants.grid,
            marginRight: constants.grid * 8,
          },
        ]}
      />
    );
  }

  return children(response);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: constants.grid,
    marginVertical: constants.smallGrid,
  },
});

export default GetOneAsync;

import React, { FC, useEffect, useState } from 'react';
import { InteractionManager, ScrollView } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/core';
import { HeaderBackButton } from '@react-navigation/stack';

import Icon from '!/components/Icon';
import useFocusEffect from '!/hooks/use-focus-effect';
import usePress from '!/hooks/use-press';
import { Film, MainNavigationProp, MainRouteProp, People, Planet, Species, Starship, Vehicle } from '!/types';
import capitalize from '!/utils/capitalize';
import resourceToSingular from '!/utils/resource-to-singular';

import FilmDetails from './FilmDetails';
import PersonDetails from './PersonDetails';
import PlanetDetails from './PlanetDetails';
import SpeciesDetails from './SpeciesDetails';
import StarshipDetails from './StarshipDetails';
import styles from './styles';
import VehicleDetails from './VehicleDetails';

const Details: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'Details'>>();
  const { params } = useRoute<MainRouteProp<'Details'>>();

  const [shouldLoad, setShouldLoad] = useState(false);

  let Component: JSX.Element;

  const handleGoToHome = usePress(() => {
    requestAnimationFrame(() => {
      navigation.popToTop();
    });
  });

  useFocusEffect(() => {
    void InteractionManager.runAfterInteractions(() => {
      setShouldLoad(true);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: capitalize(resourceToSingular(params.resource)),
      headerRight: ({ tintColor }) => (
        <HeaderBackButton
          backImage={() => <Icon color={tintColor} name='format-horizontal-align-left' size={28} />}
          labelVisible={false}
          onPress={handleGoToHome}
        />
      ),
    });
  }, [handleGoToHome, navigation, params.resource]);

  switch (params.resource) {
    case 'films':
      Component = <FilmDetails result={params.result as Film} shouldLoad={shouldLoad} />;
      break;
    case 'species':
      Component = <SpeciesDetails result={params.result as Species} shouldLoad={shouldLoad} />;
      break;
    case 'starships':
      Component = <StarshipDetails result={params.result as Starship} shouldLoad={shouldLoad} />;
      break;
    case 'vehicles':
      Component = <VehicleDetails result={params.result as Vehicle} shouldLoad={shouldLoad} />;
      break;
    case 'people':
      Component = <PersonDetails result={params.result as People} shouldLoad={shouldLoad} />;
      break;
    case 'planets':
    default:
      Component = <PlanetDetails result={params.result as Planet} shouldLoad={shouldLoad} />;
      break;
  }

  return <ScrollView contentContainerStyle={styles.scrollContent}>{Component}</ScrollView>;
};

export default Details;

import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, InteractionManager } from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation, useRoute } from '@react-navigation/native';

import HeaderBackIcon from '!/components/HeaderBackIcon';
import Loading from '!/components/Loading';
import ResourceCard, { MAX_HEIGHT, SCROLL_DISTANCE } from '!/components/ResourceCard';
import Separator from '!/components/Separator';
import useFocusEffect from '!/hooks/use-focus-effect';
import useFontFamily from '!/hooks/use-font-family';
import useMethod from '!/hooks/use-method';
import usePress from '!/hooks/use-press';
import { chooseRequest } from '!/services/swapi';
import {
  Film,
  MainNavigationProp,
  MainRouteProp,
  People,
  Planet,
  ResourceMultiple,
  Species,
  Starship,
  Vehicle,
} from '!/types';
import getNumberFromUrl from '!/utils/get-number-from-url';

import FilmItem from './FilmItem';
import PersonItem from './PersonItem';
import PlanetItem from './PlanetItem';
import SpeciesItem from './SpeciesItem';
import StarshipItem from './StarshipItem';
import styles from './styles';
import VehicleItem from './VehicleItem';

const ResourceList: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'ResourceList'>>();
  const { params } = useRoute<MainRouteProp<'ResourceList'>>();
  const { resource } = params;

  const { fontFamily } = useFontFamily();

  const [isBackIconVisible, setIsBackIconVisible] = useState(false);
  const [renderLoading, setRenderLoading] = useState(false);

  const [response, setResponse] = useState<ResourceMultiple<typeof resource> | null>(null);

  // from: https://github.com/Gapur/react-native-scrollable-animated-header
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, -SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const handleGoBack = usePress(() => {
    requestAnimationFrame(() => {
      scrollY.setValue(0);
      navigation.pop();
    });
  });

  const fetchNextPage = useMethod(() => {
    console.log('next page', response?.next);
    if (response?.next) {
      const page = getNumberFromUrl(response.next).toString();

      void chooseRequest(resource)({ page }).then((res: ResourceMultiple<typeof resource>) => {
        requestAnimationFrame(() => {
          setResponse((prev) => ({
            ...res,
            results: [...(prev?.results || []), ...res.results],
          }));
        });
      });
    }
  });

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleGoBack();
      return true;
    });

    void InteractionManager.runAfterInteractions(() => {
      setIsBackIconVisible(true);
      setRenderLoading(true);
    });

    void chooseRequest(resource)().then((res: ResourceMultiple<typeof resource>) => {
      requestAnimationFrame(() => {
        setResponse(res);
      });
    });

    return () => {
      backHandler.remove();
    };
  }, [handleGoBack, resource]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <Animated.FlatList
        contentContainerStyle={[styles.scrollContent, { paddingTop: MAX_HEIGHT }]}
        data={response?.results}
        extraData={fontFamily}
        ItemSeparatorComponent={Separator}
        keyExtractor={(_, index) => `item${index}`}
        ListEmptyComponent={renderLoading ? <Loading /> : null}
        ListFooterComponent={response?.next ? <Loading size={16} /> : null}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.2}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        renderItem={({ index, item, separators }) => {
          switch (resource) {
            case 'films':
              return <FilmItem index={index} item={item as Film} separators={separators} />;
            case 'species':
              return <SpeciesItem index={index} item={item as Species} separators={separators} />;
            case 'starships':
              return <StarshipItem index={index} item={item as Starship} separators={separators} />;
            case 'vehicles':
              return <VehicleItem index={index} item={item as Vehicle} separators={separators} />;
            case 'people':
              return <PersonItem index={index} item={item as People} separators={separators} />;
            case 'planets':
            default:
              return <PlanetItem index={index} item={item as Planet} separators={separators} />;
          }
        }}
        scrollEventThrottle={16}
      />

      <Animated.View style={[styles.headerView, { transform: [{ translateY: headerTranslateY }] }]}>
        <SharedElement id={`${resource}.background.image`}>
          <ResourceCard resource={resource} scrollY={scrollY} />
        </SharedElement>
      </Animated.View>

      <HeaderBackIcon onPress={handleGoBack} visible={isBackIconVisible} />
    </>
  );
};

export default ResourceList;

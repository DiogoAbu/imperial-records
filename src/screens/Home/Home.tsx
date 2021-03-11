import React, { FC, useEffect } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import Icon from '!/components/Icon';
import usePress from '!/hooks/use-press';
import { MainNavigationProp } from '!/types';

import ResourceItem from './ResourceItem';
import styles from './styles';

const Home: FC = () => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();

  const handleGoToSettings = usePress(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Settings');
    });
  });

  useEffect(() => {
    navigation.setOptions({
      title: 'Imperial Records',
      headerRight: ({ tintColor }) => (
        <HeaderBackButton
          backImage={() => <Icon color={tintColor} name='menu' size={28} />}
          labelVisible={false}
          onPress={handleGoToSettings}
        />
      ),
    });
  }, [handleGoToSettings, navigation]);

  return (
    <ScrollView style={styles.contentContainer}>
      <ResourceItem resource='people' />

      <ResourceItem resource='species' />

      <ResourceItem resource='vehicles' />

      <ResourceItem resource='starships' />

      <ResourceItem resource='planets' />

      <ResourceItem resource='films' />
    </ScrollView>
  );
};

export default Home;

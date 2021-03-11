import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import SectionTitle from '!/components/SectionTitle';
import Separator from '!/components/Separator';
import usePress from '!/hooks/use-press';
import openUrl from '!/utils/open-url';

import FontItem from './FontItem';
import styles from './styles';

const Settings: FC = () => {
  const { colors } = useTheme();

  const handleOpenDeveloperUrl = usePress(() => {
    void openUrl('https://www.linkedin.com/in/diogo-azevedo-silva/');
  });

  const handleOpenSwapiUrl = usePress(() => {
    void openUrl('https://swapi.dev');
  });

  const handleOpenUnsplashUrl = usePress(() => {
    void openUrl('https://unsplash.com');
  });

  const handleOpenAurebeshFontUrl = usePress(() => {
    void openUrl('https://boards.theforce.net/threads/updated-new-aurebesh-font.50009464/');
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <SectionTitle>Language</SectionTitle>
      <FontItem />

      <Separator />

      <SectionTitle>About</SectionTitle>
      <ListItem
        description='App Developer'
        descriptionStyle={{ color: colors.primary }}
        left={() => <Icon name='face' size={30} />}
        onPress={handleOpenDeveloperUrl}
        title='Diogo de Azevedo Silva'
      />
      <ListItem
        description='Aurebesh Font'
        descriptionStyle={{ color: colors.primary }}
        left={() => <Icon name='face' size={30} />}
        onPress={handleOpenAurebeshFontUrl}
        title='Tycho Ordo'
      />
      <ListItem
        description='https://swapi.dev'
        descriptionStyle={{ color: colors.primary }}
        left={() => <Icon name='database' size={30} />}
        onPress={handleOpenSwapiUrl}
        title='Data by SWAPI'
      />
      <ListItem
        description='https://unsplash.com'
        descriptionStyle={{ color: colors.primary }}
        left={() => <Icon name='image' size={30} />}
        onPress={handleOpenUnsplashUrl}
        title='Images by Unsplash'
      />
    </ScrollView>
  );
};

export default Settings;

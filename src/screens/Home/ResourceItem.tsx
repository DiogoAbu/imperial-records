import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

import ResourceCard from '!/components/ResourceCard';
import SlideIn from '!/components/SlideIn';
import usePress from '!/hooks/use-press';
import { MainNavigationProp, ResourceName } from '!/types';

interface Props {
  resource: ResourceName;
}

const ResourceItem: FC<Props> = ({ resource }) => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();

  const handleGoToResourceList = usePress(() => {
    navigation.navigate('ResourceList', { resource });
  });

  return (
    <SlideIn direction='right'>
      <TouchableOpacity activeOpacity={0.6} onPress={handleGoToResourceList}>
        <SharedElement id={`${resource}.background.image`}>
          <ResourceCard resource={resource} />
        </SharedElement>
      </TouchableOpacity>
    </SlideIn>
  );
};

export default ResourceItem;

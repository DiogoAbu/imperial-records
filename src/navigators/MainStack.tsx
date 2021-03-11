import React, { FC } from 'react';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';

import Icon from '!/components/Icon';
import useFontFamily from '!/hooks/use-font-family';
import Details from '!/screens/Details/Details';
import Home from '!/screens/Home/Home';
import ResourceList from '!/screens/ResourceList/ResourceList';
import Settings from '!/screens/Settings/Settings';
import { MainStackParams } from '!/types';

const Stack = createSharedElementStackNavigator<MainStackParams>();

const MainStack: FC = () => {
  const { colors, dark } = useTheme();
  const { fontFamily } = useFontFamily();

  return (
    <Stack.Navigator
      headerMode='screen'
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: dark ? colors.primary : Colors.white,
        headerStyle: { backgroundColor: dark ? colors.card : colors.primary },
        headerTitleStyle: { fontFamily },
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }) => <Icon color={tintColor} name='chevron-left' />,
      }}
    >
      <Stack.Screen component={Home} name='Home' />

      <Stack.Screen
        component={ResourceList}
        name='ResourceList'
        sharedElements={(route, otherRoute) => {
          if (otherRoute.name !== 'Details') {
            const resource = route.params.resource as string;
            return [`${resource}.background.image`];
          }
          return [];
        }}
      />

      <Stack.Screen
        component={Details}
        name='Details'
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        component={Settings}
        name='Settings'
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

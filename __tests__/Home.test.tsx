import 'react-native';

import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { FontFamilyContext } from '!/hooks/use-font-family';
import Home from '!/screens/Home/Home';

jest.mock('@react-navigation/core', () => ({
  createNavigatorFactory: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it('renders correctly', async () => {
  // Mock navigation
  const mockNavigate = jest.fn();

  // @ts-ignore
  useNavigation.mockImplementation(() => ({
    navigate: mockNavigate,
    setOptions: jest.fn(),
  }));

  // Render component
  const { getByText } = render(
    <FontFamilyContext.Provider value={{ fontFamily: undefined, setFontFamily: () => null }}>
      <Home />
    </FontFamilyContext.Provider>,
  );

  await waitFor(() => {
    // Get pressable and press it
    const pressable = getByText(/people/i);
    fireEvent.press(pressable);
  });

  // Check if navigated
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  expect(mockNavigate).toHaveBeenCalledWith('ResourceList', { resource: 'people' });
});

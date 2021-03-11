import React, { FC } from 'react';

import { useTheme } from '@react-navigation/native';

import Icon from '!/components/Icon';
import ListItem from '!/components/ListItem';
import useFontFamily from '!/hooks/use-font-family';
import usePress from '!/hooks/use-press';

const FontItem: FC = () => {
  const { colors } = useTheme();
  const { fontFamily, setFontFamily } = useFontFamily();

  const handleChangeFont = usePress(() => {
    requestAnimationFrame(() => {
      setFontFamily((prev) => (!prev ? 'Aurebesh' : undefined));
    });
  });

  return (
    <ListItem
      left={() => <Icon name='format-font' size={30} />}
      onPress={handleChangeFont}
      right={() => (
        <Icon
          color={colors.primary}
          name={fontFamily ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={30}
        />
      )}
      title='I know my Aurebesh'
    />
  );
};

export default FontItem;

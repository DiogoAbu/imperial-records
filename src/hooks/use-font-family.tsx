import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface FontFamilyState {
  fontFamily: 'Aurebesh' | 'AurebeshInverted' | undefined;
  setFontFamily: React.Dispatch<React.SetStateAction<FontFamilyState['fontFamily']>>;
}

const FontFamilyContext = createContext<FontFamilyState | undefined>(undefined);

const storageKey = 'fontFamily';

export const FontFamilyProvider: FC = ({ children }) => {
  const [fontFamily, setFontFamily] = useState<FontFamilyState['fontFamily'] | null>(null);

  useEffect(() => {
    void (async () => {
      const data = await AsyncStorage.getItem(storageKey);
      setFontFamily((data || undefined) as FontFamilyState['fontFamily']);
    })();
  }, []);

  useEffect(() => {
    if (fontFamily) {
      void AsyncStorage.setItem(storageKey, fontFamily);
    } else if (typeof fontFamily === 'undefined') {
      void AsyncStorage.removeItem(storageKey);
    }
  }, [fontFamily]);

  const value = useMemo(() => ({ fontFamily, setFontFamily } as FontFamilyState), [
    fontFamily,
    setFontFamily,
  ]);

  return <FontFamilyContext.Provider value={value}>{children}</FontFamilyContext.Provider>;
};

export default function useFontFamily(): FontFamilyState {
  const value = useContext(FontFamilyContext);

  if (typeof value === 'undefined') {
    throw new Error('useFontFamily must be used within a FontFamilyContext');
  }

  return value;
}

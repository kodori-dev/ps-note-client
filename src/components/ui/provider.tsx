'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const emotionCache = createCache({ key: 'emotion-cache', prepend: false });

export function Provider(props: ColorModeProviderProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </CacheProvider>
  );
}

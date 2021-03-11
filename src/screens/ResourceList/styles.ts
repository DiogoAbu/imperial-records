import { StyleSheet } from 'react-native';

import { MAX_HEIGHT } from '!/components/ResourceCard';

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: MAX_HEIGHT,
  },
});

export default styles;

import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },

  headerContent: {
    margin: constants.smallGrid,
    padding: constants.grid,
  },
  headerText: {
    textAlign: 'center',
  },

  resourceBackground: {
    justifyContent: 'flex-end',
    height: 224,
  },
  resourceText: {
    padding: constants.grid,
    fontSize: 24,
    fontWeight: 'bold',
  },
  resourceOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: constants.darkOverlay,
  },
});

export default styles;

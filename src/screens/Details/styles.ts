import { StyleSheet } from 'react-native';

import { constants } from '!/services/theme';

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },

  itemCenter: {
    paddingVertical: constants.smallGrid,
  },
  itemDescription: {
    textTransform: 'uppercase',
    fontSize: 13,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  rowItem: {
    flex: 1,
  },
});

export default styles;

import { StyleSheet } from 'react-native';

const stylesCheckbox = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainers: {
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    flex: 1,
  },
  checkboxSelectedLabel: {
    fontSize: 16,
    flex: 1,
    color: '#8ac437',
  },
  iconPreview: {
    marginRight: 12,
  },
});

export default stylesCheckbox;

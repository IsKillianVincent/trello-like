import { StyleSheet } from 'react-native';

export const stylesAuth = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 8,
    width: 300,
    height: 300,
  },
  buttonPrimary: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#8ac437',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#8ac437',
  },
  buttonSecondaryText: {
    color: '#8ac437',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    marginHorizontal: 80,
    textAlign: 'center',
  },
  link: {
    color: '#8ac437',
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default stylesAuth;

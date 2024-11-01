import { StyleSheet } from 'react-native';

export const stylesAccount = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: 'white'
      },
      profileSection: {
        alignItems: 'center',
        marginBottom: 20,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
      initialsContainer: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
      },
      initialsText: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
      },
      displayName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
      },
      username: {
        fontSize: 18,
        color: '#666666',
      },
      email: {
        fontSize: 16,
        color: '#666666',
      },
      joinDate: {
        fontSize: 14,
        color: '#666666',
      },
      section: {
        marginVertical: 4,
        borderRadius: 8,
        padding: 16,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000000',
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        color: '#000000',
      },
      accessibilityOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      },
      version: {
        textAlign: 'center',
        marginVertical: 16,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666666',
      },
      listItem: {
        borderRadius: 12,
      },
});

export default stylesAccount;
import { StyleSheet } from 'react-native';

export const stylesProject = StyleSheet.create({
    projectCard: {
        marginVertical: 4,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#8ac437',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'white',
    },
    deleteButtonText: {
        color: 'red',
        fontWeight: 'bold',
    },
    projectButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    taskButton: {
        flex: 3,
        marginRight: 4,
    },
    deleteButtonWrapper: {
        flex: 1,
    },
    title: {
        marginVertical: 8,
        fontSize: 30,
    fontWeight: 'bold',
    },
    input: {
        width: '100%' ,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        fontSize: 16,
      },
    container: {
        flex: 1,
        padding: 20,
    },
    projectScreenSafe: {
        flex: 1,
    },
    projectScreenContainer: {
        margin: 8,
    },
    projectButtons: {
        flexDirection:'row',
        marginVertical: 8,
    },
    projectListItem: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    taskScreenContainer: {
        margin: 8,
    },
    statusRowContainer: {
        marginVertical: 8,
        marginHorizontal: 0,
    },
    statusRow: {
        paddingLeft: 8,
    },
    columnTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'black',
        paddingLeft: 10,
    },
    task: {
        padding: 12,
        backgroundColor: '#fff',
        marginRight: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskText: {
        fontSize: 16,
        color: '#333',
    },
    iconContainer : {
        position: 'relative',
        flexDirection:'row',
        justifyContent: 'center',
        // gap: 32,
        bottom: 24,
    },
    mediaContainer: {
        maxHeight: 400,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      },
      mediaContent: {
        alignItems: 'center',
      },
      image: {
        width: 400,
        height: 400,
        marginBottom: 0,
        borderRadius: 5,
      },
      video: {
        width: 100,
        height: 100,
        marginBottom: 0,
      },
    dropdown: {
        height: 40,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    dropdownContainer: {
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    loadingText: {
        color: 'blue',
        marginTop: 5,
        fontStyle: 'italic',
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 16,
      },
});

export default stylesProject;

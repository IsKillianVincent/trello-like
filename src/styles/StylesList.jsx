import { StyleSheet } from "react-native";

export const stylesList = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 2,
  },
  iconContainer: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  textContainer: {
    flex: 1, 
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
  chevronContainer: {
    width: 24, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  SwitchContainer: {
    display: 'flex',
    width: 24,
    right: 12, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDanger: {
    color: "red",
  },
  txtInfo: {
    color: "gray"
  }

});

export default stylesList;
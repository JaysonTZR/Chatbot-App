import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#1a202e',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    chatContainer: {
      flex: 1,
      padding: 10,
      backgroundColor: '#242b3d'
    },
    messageBubble: {
      backgroundColor: '#6200ea',
      padding: 10,
      borderRadius: 20,
      marginVertical: 5,
      maxWidth: '80%',
    },
    messageText: {
      color: '#fff',
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 15,
      borderTopWidth: 1,
      borderColor: '#1a202e',
      backgroundColor: '#1a202e'
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#868b98',
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#868b98',
      color: '#fff'
    },
    sendButton: {
      padding: 10,
      borderRadius: 20,
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    userTimestamp: {
      fontSize: 11,
      color: '#ccc',
      marginTop: 4,
      alignSelf: 'flex-end'
    },
    aiTimestamp: {
      fontSize: 11,
      color: '#ccc',
      marginTop: 4,
      alignSelf: 'flex-start'
    }
});

export default styles;
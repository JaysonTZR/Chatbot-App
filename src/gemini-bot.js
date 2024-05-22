import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View, FlatList, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './gemini-bot-styles';

const GOOGLE_API_KEY = 'YOUR_API_KEY';

export default function Gemini_Bot() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
  
    const handleSend = async () => {
      Keyboard.dismiss();
      if (inputText.trim()) {
        const newMessage = {
          id: Date.now().toString(),
          text: inputText,
          isUser: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInputText('');
  
        setIsLoading(true);
  
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: inputText
                }]
              }]
            })
          });
  
          const data = await response.json();
          if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
          const aiResponseText = data.candidates[0].content.parts[0].text;

          const aiMessage = {
              id: (Date.now() + 1).toString(),
              text: aiResponseText,
              isUser: false,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setMessages(prevMessages => [...prevMessages, aiMessage]);
          } else {
          console.error('Unexpected API response structure:', data);
          }
        } catch (error) {
          console.error('Error fetching AI response:', error);
        }
        setIsLoading(false);
      }
    };

    const addInitialGreeting = () => {
      const initialMessage = {
          id: '1',
          text: 'Hi there! How can I help you today?',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMessage]);
    };

    useEffect(() => {
      addInitialGreeting();
    }, []);

    const handlePressMessage = (messageId) => {
      setSelectedMessages(prevSelectedMessages => {
        if (prevSelectedMessages.includes(messageId)) {
          return prevSelectedMessages.filter(id => id !== messageId);
        } else {
          return [...prevSelectedMessages, messageId];
        }
      });
    };

    const isMessageSelected = (messageId) => selectedMessages.includes(messageId);
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => handlePressMessage(item.id)}
      >
        <View style={[styles.messageBubble, item.isUser ? { alignSelf: 'flex-end', backgroundColor: '#868b98' } : { alignSelf: 'flex-start', backgroundColor: '#494f62' }]}>
          <Text style={styles.messageText}>{item.text}</Text>
          {isMessageSelected(item.id) && (
            <Text style={item.isUser ? styles.userTimestamp : styles.aiTimestamp}>{item.timestamp}</Text>
          )}
        </View>
      </TouchableOpacity>
    );

    const addTypingMessage = () => {
      const typingMessage = {
          id: 'typing',
          text: '...',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, typingMessage]);
    };

    const removeTypingMessage = () => {
      setMessages(prevMessages => prevMessages.filter(message => message.id !== 'typing'));
    };

    useEffect(() => {
      if (isLoading) {
        addTypingMessage();
      } else {
        removeTypingMessage();
      }
    }, [isLoading]);
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Gemini AI</Text>
        </View>
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message"
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
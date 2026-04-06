import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { handleInput } from '../Order'; 

const { width, height } = Dimensions.get('window');

export default function App() {
  const [points, setPoints] = useState(0);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now(), text: `You: ${inputText}`, type: 'user' };
    const botResponses = handleInput(inputText);
    
    let newMessages = [...messages, userMsg];
    
    botResponses.forEach(res => {
      if (res === "ORDER_COMPLETE") {
        setPoints(prev => prev + 1); 
      } else {
        newMessages.push({ id: Math.random(), text: `Bot: ${res}`, type: 'bot' });
      }
    });
    
    setMessages(newMessages);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Loyalty Dashboard */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Fuego's Loyalty App</Text>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Loyalty Points</Text>
          <Text style={styles.pointsValue}>{points}</Text>
          <Text style={styles.pointsHint}>{10 - (points % 10)} orders until your FREE meal!</Text>
        </View>
      </View>

      {/* Floating Action Button - Pinned to Bottom Right */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setIsChatVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>💬 Order Now</Text>
      </TouchableOpacity>

      {/* Chat Interface Modal */}
      <Modal visible={isChatVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Fuego's Order Bot</Text>
            <TouchableOpacity onPress={() => setIsChatVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.type === 'user' ? styles.userMsg : styles.botMsg]}>
                <Text style={item.type === 'user' ? styles.userMsgText : styles.botMsgText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            style={styles.chatList}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              value={inputText} 
              onChangeText={setInputText} 
              placeholder="Type your order..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fdf2e9' 
  },
  mainContent: { 
    flex: 1,
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900', 
    marginBottom: 40, 
    color: '#d35400',
    textAlign: 'center'
  },
  pointsCard: { 
    backgroundColor: '#fff', 
    paddingVertical: 50,
    paddingHorizontal: 20, 
    borderRadius: 30, 
    width: '90%', 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, 
    shadowRadius: 20,
    elevation: 10 
  },
  pointsLabel: { 
    color: '#7f8c8d', 
    fontSize: 20, 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  pointsValue: { 
    fontSize: 100, 
    fontWeight: 'bold', 
    color: '#e67e22',
    marginVertical: 10
  },
  pointsHint: { 
    marginTop: 10, 
    color: '#34495e', 
    fontSize: 16,
    fontWeight: '500' 
  },
  // FIXED POSITIONING FOR THE BUTTON
  fab: { 
    position: 'absolute', 
    right: 25, 
    bottom: 40, 
    backgroundColor: '#e67e22', 
    paddingVertical: 15,
    paddingHorizontal: 25, 
    borderRadius: 50, 
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fabText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  modalContainer: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d35400'
  },
  closeBtn: { 
    padding: 10 
  },
  closeBtnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999'
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 15
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '85%'
  },
  userMsg: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#e67e22'
  },
  userMsgText: {
    color: '#fff',
    fontSize: 16
  },
  botMsg: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#f1f1f1'
  },
  botMsgText: {
    color: '#2c3e50',
    fontSize: 16
  },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 20, 
    paddingBottom: 40,
    borderTopWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#fff' 
  },
  input: { 
    flex: 1, 
    backgroundColor: '#f9f9f9',
    borderRadius: 25, 
    paddingHorizontal: 20, 
    height: 50,
    fontSize: 16
  },
  sendBtn: { 
    backgroundColor: '#d35400', 
    paddingHorizontal: 20, 
    justifyContent: 'center', 
    marginLeft: 10, 
    borderRadius: 25 
  },
  sendBtnText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { handleInput } from '../Order'; 

export default function App() {
  const [points, setPoints] = useState(0);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText) return;
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
      <View style={styles.mainContent}>
        <Text style={styles.title}>Fuego's Loyalty App</Text>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsLabel}>Loyalty Points</Text>
          <Text style={styles.pointsValue}>{points}</Text>
          <Text style={styles.pointsHint}>{10 - (points % 10)} orders until your FREE meal!</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => setIsChatVisible(true)}>
        <Text style={styles.fabText}>💬 Order Now</Text>
      </TouchableOpacity>

      <Modal visible={isChatVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setIsChatVisible(false)} style={styles.closeBtn}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>✕ Close</Text>
          </TouchableOpacity>
          <FlatList
            data={messages}
            renderItem={({ item }) => <Text style={item.type === 'user' ? styles.userMsg : styles.botMsg}>{item.text}</Text>}
            keyExtractor={item => item.id.toString()}
            style={{flex: 1}}
          />
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={inputText} onChangeText={setInputText} placeholder="Type your order..." />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}><Text style={{color: 'white'}}>Send</Text></TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mainContent: { padding: 20, alignItems: 'center', marginTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#d35400' },
  pointsCard: { backgroundColor: '#fff', padding: 40, borderRadius: 20, width: '90%', alignItems: 'center', shadowOpacity: 0.1, elevation: 5 },
  pointsLabel: { color: '#7f8c8d', fontSize: 18, marginBottom: 10 },
  pointsValue: { fontSize: 80, fontWeight: 'bold', color: '#e67e22' },
  pointsHint: { marginTop: 20, color: '#34495e', fontWeight: '500' },
  fab: { position: 'absolute', right: 30, bottom: 50, backgroundColor: '#e67e22', padding: 20, borderRadius: 35, elevation: 10 },
  fabText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  closeBtn: { alignSelf: 'flex-end', padding: 20 },
  inputContainer: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 25, paddingHorizontal: 20, height: 50 },
  sendBtn: { backgroundColor: '#e67e22', paddingHorizontal: 20, justifyContent: 'center', marginLeft: 10, borderRadius: 25 },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#3498db', color: '#fff', padding: 12, margin: 8, borderRadius: 15, maxWidth: '80%' },
  botMsg: { alignSelf: 'flex-start', backgroundColor: '#f1f1f1', color: '#2c3e50', padding: 12, margin: 8, borderRadius: 15, maxWidth: '80%' }
});
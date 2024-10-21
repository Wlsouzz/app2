import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    { title: 'Home', onPress: () => navigation.navigate('Home') },
    { title: 'Login', onPress: () => navigation.navigate('Login') },
    { title: 'Cadastro', onPress: () => navigation.navigate('Cadastro') },
    { title: 'Contato', onPress: () => alert('Entre em contato conosco!') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => setModalVisible(true)}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.userName}>Olá, (nome de usuário)</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="calculator" size={28} color="#0074d9" />
            <Text style={styles.cardTitle}>Calculadora Hídrica</Text>
            <Text style={styles.cardDescription}>Calcule seu consumo de água.</Text>
          </View>
          <View style={styles.card}>
            <Icon name="tint" size={28} color="#0074d9" />
            <Text style={styles.cardTitle}>Água Virtual</Text>
            <Text style={styles.cardDescription}>Entenda o conceito de água virtual.</Text>
          </View>
          <View style={styles.card}>
            <Icon name="users" size={28} color="#0074d9" />
            <Text style={styles.cardTitle}>Contato</Text>
            <Text style={styles.cardDescription}>Entre em contato conosco.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Ir para Login</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                  item.onPress();
                  setModalVisible(false);
                }}>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#0074d9',
    elevation: 4,
    width: '100%',
  },
  menuIcon: {
    paddingRight: 16,
  },
  userName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '30%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#0074d9',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0074d9',
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#00bfff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: '100%',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    color: '#0074d9',
    fontSize: 16,
  },
});

export default HomeScreen;

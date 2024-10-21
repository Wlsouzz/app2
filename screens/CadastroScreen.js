import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, Modal, ScrollView } from 'react-native';

const CadastroScreen = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const validateFields = () => {
    const errors = {};
    if (!username) errors.username = 'Nome de usuário é obrigatório.';
    if (!name) errors.name = 'Nome é obrigatório.';
    if (!email) errors.email = 'E-mail é obrigatório.';
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'E-mail inválido.';
    if (!password) errors.password = 'Senha é obrigatória.';
    if (password !== confirmPassword) errors.confirmPassword = 'As senhas não coincidem.';
    if (!acceptTerms) errors.acceptTerms = 'Você precisa aceitar os termos de uso.';

    return errors;
  };

  const handleSignup = () => {
    setLoading(true);
    setErrorMessages({}); // Limpar mensagens de erro

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setErrorMessages(errors);
      return;
    }

    // Simulação de cadastro
    setTimeout(() => {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      setLoading(false);
    }, 1000);
  };

  const checkPasswordStrength = (password) => {
    let strength = 'fraca';
    if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      strength = 'forte';
    } else if (password.length >= 6) {
      strength = 'média';
    }
    setPasswordStrength(strength);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    
      <Text style={styles.title}>CADASTRO</Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, errorMessages.username && styles.inputError]}
          placeholder="Nome de Usuário"
          onChangeText={setUsername}
          value={username}
        />
        {errorMessages.username && <Text style={styles.errorText}>{errorMessages.username}</Text>}

        <TextInput
          style={[styles.input, errorMessages.name && styles.inputError]}
          placeholder="Nome Completo"
          onChangeText={setName}
          value={name}
        />
        {errorMessages.name && <Text style={styles.errorText}>{errorMessages.name}</Text>}

        <TextInput
          style={[styles.input, errorMessages.email && styles.inputError]}
          placeholder="exemplo@dominio.com"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, errorMessages.password && styles.inputError]}
            placeholder="Senha (mínimo 6 caracteres)"
            onChangeText={(text) => {
              setPassword(text);
              checkPasswordStrength(text);
            }}
            value={password}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text style={styles.togglePassword}>{passwordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
        {password && <Text style={styles.passwordStrength}>Força da senha: {passwordStrength}</Text>}

        <TextInput
          style={[styles.input, errorMessages.confirmPassword && styles.inputError]}
          placeholder="Confirme a Senha"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={!passwordVisible}
        />
        {errorMessages.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}

        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setAcceptTerms(!acceptTerms)}>
            <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
              {acceptTerms && <Text style={styles.checkboxText}>✔</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.termsText}>Aceito os </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.linkText}>Termos de Uso</Text>
          </TouchableOpacity>
        </View>
        {errorMessages.acceptTerms && <Text style={styles.errorText}>{errorMessages.acceptTerms}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Já tem uma conta? <Text style={styles.linkText}>Faça login</Text>
        </Text>
      </View>

      {/* Modal de Termos de Uso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Termos de Uso</Text>
            <Text style={styles.modalText}>
              Os termos de uso são um conjunto de diretrizes e regras que regem a utilização de um serviço, produto ou plataforma. Eles servem para proteger tanto o usuário quanto a empresa, estabelecendo direitos e obrigações. Aqui estão alguns elementos comuns que costumam ser incluídos nos termos de uso:
            </Text>
            <Text style={styles.modalText}>
              1. *Aceitação dos Termos*: Uma declaração que informa que, ao usar o serviço, o usuário concorda com os termos estabelecidos.
              {'\n'}
              2. *Definições*: Explicação de termos técnicos ou específicos usados nos termos, para garantir que o usuário compreenda claramente.
              {'\n'}
              3. *Uso Permitido*: Detalha o que é considerado um uso aceitável do serviço, incluindo quaisquer restrições.
              {'\n'}
              4. *Criação de Conta*: Instruções sobre como criar uma conta, incluindo requisitos de idade e verificação de identidade.
              {'\n'}
              5. *Privacidade*: Referência à política de privacidade, que explica como os dados do usuário serão coletados, usados e protegidos.
              {'\n'}
              6. *Propriedade Intelectual*: Informação sobre os direitos autorais e marcas registradas, e que o conteúdo é protegido.
              {'\n'}
              7. *Responsabilidades do Usuário*: Obrigações do usuário, como fornecer informações precisas e não violar direitos de terceiros.
              {'\n'}
              8. *Limitação de Responsabilidade*: Declaração que limita a responsabilidade da empresa em relação a danos que possam ocorrer ao usar o serviço.
              {'\n'}
              9. *Modificações nos Termos*: Indica que os termos podem ser alterados e que o usuário deve verificar periodicamente.
              {'\n'}
              10. *Rescisão*: Condições sob as quais a empresa pode encerrar a conta do usuário ou restringir o acesso ao serviço.
              {'\n'}
              11. *Legislação Aplicável*: Indica qual jurisdição se aplica a quaisquer disputas que possam surgir.
              {'\n'}
              12. *Contato*: Informações de contato para dúvidas ou esclarecimentos sobre os termos.
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0074d9',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#0074d9',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#e8f0fe',
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#0074d9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: '#0074d9',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#0074d9',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 18,
  },
  termsText: {
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  togglePassword: {
    marginLeft: 10,
    fontSize: 18,
  },
  passwordStrength: {
    color: '#0074d9',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    color: '#0074d9',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0074d9',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CadastroScreen;
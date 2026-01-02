import React, { useState } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { teachersAPI } from '../api/teachers';
import { theme } from '../styles/theme';
import Input from '../components/Input';
import Button from '../components/Button';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.View`
  padding: ${props => props.theme.spacing.md}px;
`;

const HelperText = styled.Text`
  font-size: ${props => props.theme.fontSize.xs}px;
  color: ${props => props.error ? props.theme.colors.danger : props.theme.colors.textSecondary};
  margin-top: -${props => props.theme.spacing.sm}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
  margin-left: ${props => props.theme.spacing.xs}px;
`;

const TeacherCreateScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isNameValid = name.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const handleCreate = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!isNameValid) {
      Alert.alert('Erro', 'O nome deve ter no mínimo 3 caracteres');
      return;
    }

    if (!isEmailValid) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    if (!isPasswordValid) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await teachersAPI.create({ name, email, password });
      Alert.alert('Sucesso', 'Professor cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível cadastrar o professor');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Content>
            <Input
              label="Nome *"
              value={name}
              onChangeText={setName}
              onBlur={() => setNameTouched(true)}
              placeholder="Mínimo 3 caracteres"
            />
            {nameTouched && !isNameValid && (
              <HelperText error>Nome deve ter no mínimo 3 caracteres</HelperText>
            )}
            {nameTouched && isNameValid && (
              <HelperText>✓ Nome válido</HelperText>
            )}
            
            <Input
              label="E-mail *"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setEmailTouched(true)}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailTouched && !isEmailValid && (
              <HelperText error>Email inválido</HelperText>
            )}
            {emailTouched && isEmailValid && (
              <HelperText>✓ Email válido</HelperText>
            )}
            
            <Input
              label="Senha *"
              value={password}
              onChangeText={setPassword}
              onBlur={() => setPasswordTouched(true)}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              autoCapitalize="none"
            />
            {passwordTouched && !isPasswordValid && (
              <HelperText error>Senha deve ter no mínimo 6 caracteres</HelperText>
            )}
            {passwordTouched && isPasswordValid && (
              <HelperText>✓ Senha válida</HelperText>
            )}
            
            <Button
              title="Cadastrar Professor"
              onPress={handleCreate}
              loading={loading}
              disabled={!isNameValid || !isEmailValid || !isPasswordValid}
              fullWidth
            />
          </Content>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default TeacherCreateScreen;

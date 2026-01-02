import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useAuth } from '../contexts/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../styles/theme';
import { ThemeProvider } from 'styled-components/native';

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  justify-content: center;
  padding: ${props => props.theme.spacing.xl}px;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSize.xxxl}px;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const Subtitle = styled.Text`
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl}px;
`;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Erro', result.message || 'Falha ao fazer login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Title>Tech Challenge</Title>
        <Subtitle>Sistema de Gerenciamento de Posts</Subtitle>
        
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        
        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Sua senha"
          secureTextEntry
          autoCapitalize="none"
        />
        
        <Button
          title="Entrar"
          onPress={handleLogin}
          loading={loading}
          fullWidth
        />
      </Container>
    </ThemeProvider>
  );
};

export default LoginScreen;

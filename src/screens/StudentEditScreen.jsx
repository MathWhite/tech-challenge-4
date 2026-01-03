import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { studentsAPI } from '../api/students';
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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HelperText = styled.Text`
  font-size: ${props => props.theme.fontSize.xs}px;
  color: ${props => props.error ? props.theme.colors.danger : props.theme.colors.textSecondary};
  margin-top: -${props => props.theme.spacing.sm}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
  margin-left: ${props => props.theme.spacing.xs}px;
`;

const CheckboxContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${props => props.theme.spacing.md}px;
`;

const Checkbox = styled.View`
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-color: ${props => props.theme.colors.primary};
  border-radius: 4px;
  background-color: ${props => props.checked ? props.theme.colors.primary : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-right: ${props => props.theme.spacing.sm}px;
`;

const CheckboxLabel = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
`;

const CheckIcon = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const StudentEditScreen = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isNameValid = name.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length === 0 || password.length >= 6;

  const loadStudent = async () => {
    try {
      const student = await studentsAPI.getById(studentId);
      setName(student.name);
      setEmail(student.email);
      setIsActive(student.isActive !== undefined ? student.isActive : true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do aluno');
      console.error(error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios');
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

    if (password && !isPasswordValid) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setSaving(true);
    try {
      const updateData = { name, email, isActive };
      if (password) {
        updateData.password = password;
      }
      await studentsAPI.update(studentId, updateData);
      Alert.alert('Sucesso', 'Aluno atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível atualizar o aluno');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadingContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Content>
            <Input
              label="E-mail *"
              value={email}
              onChangeText={() => {}}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
              style={{ backgroundColor: '#e0e0e0' }}
            />
            
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
            
            <CheckboxContainer onPress={() => setIsActive(!isActive)}>
              <Checkbox checked={isActive}>
                {isActive && <CheckIcon>✓</CheckIcon>}
              </Checkbox>
              <CheckboxLabel>Ativo</CheckboxLabel>
            </CheckboxContainer>
            
            <Input
              label="Nova Senha (deixe em branco para não alterar)"
              value={password}
              onChangeText={setPassword}
              onBlur={() => setPasswordTouched(true)}
              placeholder="Mínimo 6 caracteres (opcional)"
              secureTextEntry
              autoCapitalize="none"
            />
            {passwordTouched && password && !isPasswordValid && (
              <HelperText error>Senha deve ter no mínimo 6 caracteres</HelperText>
            )}
            {passwordTouched && password && isPasswordValid && (
              <HelperText>✓ Senha válida</HelperText>
            )}
            
            <Button
              title="Salvar Alterações"
              onPress={handleUpdate}
              loading={saving}
              disabled={!isNameValid || !isEmailValid || !isPasswordValid}
              fullWidth
            />
          </Content>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default StudentEditScreen;

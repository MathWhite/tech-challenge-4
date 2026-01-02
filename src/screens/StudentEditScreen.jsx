import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
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

const StudentEditScreen = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadStudent = async () => {
    try {
      const student = await studentsAPI.getById(studentId);
      setName(student.name);
      setEmail(student.email);
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

    setSaving(true);
    try {
      const updateData = { name, email };
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
              label="Nome *"
              value={name}
              onChangeText={setName}
              placeholder="Nome completo"
            />
            
            <Input
              label="E-mail *"
              value={email}
              onChangeText={setEmail}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Nova Senha (deixe em branco para não alterar)"
              value={password}
              onChangeText={setPassword}
              placeholder="Nova senha"
              secureTextEntry
              autoCapitalize="none"
            />
            
            <Button
              title="Salvar Alterações"
              onPress={handleUpdate}
              loading={saving}
              fullWidth
            />
          </Content>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default StudentEditScreen;

import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, Alert } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { studentsAPI } from '../api/students';
import { theme } from '../styles/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const StudentCard = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md}px;
  margin: ${props => props.theme.spacing.sm}px ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const StudentName = styled.Text`
  font-size: ${props => props.theme.fontSize.lg}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const StudentEmail = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const ActionsRow = styled.View`
  flex-direction: row;
  gap: ${props => props.theme.spacing.sm}px;
  margin-top: ${props => props.theme.spacing.sm}px;
`;

const ActionButton = styled.TouchableOpacity`
  flex: 1;
  padding: ${props => props.theme.spacing.sm}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  background-color: ${props => props.variant === 'danger' ? props.theme.colors.danger : props.theme.colors.success};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs}px;
`;

const ActionButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSize.sm}px;
  font-weight: ${props => props.theme.fontWeight.medium};
`;

const EmptyText = styled.Text`
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${props => props.theme.spacing.xxl}px;
`;

const StudentsListScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStudents = async () => {
    try {
      const data = await studentsAPI.getAll();
      setStudents(data.students || data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os alunos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await studentsAPI.delete(id);
              Alert.alert('Sucesso', 'Aluno excluído com sucesso');
              loadStudents();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o aluno');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStudents();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadStudents();
    });
    return unsubscribe;
  }, [navigation]);

  const renderStudent = ({ item }) => (
    <StudentCard>
      <StudentName>{item.name}</StudentName>
      <StudentEmail>{item.email}</StudentEmail>
      <ActionsRow>
        <ActionButton onPress={() => navigation.navigate('StudentEdit', { studentId: item._id })}>
          <Ionicons name="create-outline" size={16} color="white" />
          <ActionButtonText>Editar</ActionButtonText>
        </ActionButton>
        <ActionButton variant="danger" onPress={() => handleDelete(item._id, item.name)}>
          <Ionicons name="trash-outline" size={16} color="white" />
          <ActionButtonText>Excluir</ActionButtonText>
        </ActionButton>
      </ActionsRow>
    </StudentCard>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <FlatList
          data={students}
          renderItem={renderStudent}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !loading && <EmptyText>Nenhum aluno cadastrado</EmptyText>
          }
        />
      </Container>
    </ThemeProvider>
  );
};

export default StudentsListScreen;

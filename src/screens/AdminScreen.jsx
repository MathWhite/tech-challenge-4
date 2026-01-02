import React from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/useAuth';
import { theme } from '../styles/theme';
import Button from '../components/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md}px;
  padding-top: ${props => props.theme.spacing.xl}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
`;

const HeaderTitle = styled.Text`
  font-size: ${props => props.theme.fontSize.xxl}px;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const UserInfo = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Content = styled.View`
  padding: ${props => props.theme.spacing.md}px;
`;

const Section = styled.View`
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: ${props => props.theme.fontSize.lg}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const MenuItem = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const MenuItemContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${props => props.theme.spacing.md}px;
`;

const MenuItemText = styled.Text`
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.text};
`;

const AdminScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: logout, style: 'destructive' }
      ]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <HeaderTitle>{user?.role === 'professor' ? 'Administração' : 'Configurações'}</HeaderTitle>
          <UserInfo>Olá, {user?.name || 'Usuário'}</UserInfo>
        </Header>

        <ScrollView>
          <Content>
            {user?.role === 'professor' && (
              <>
                <Section>
                  <SectionTitle>Posts</SectionTitle>
                  <MenuItem onPress={() => navigation.navigate('PostCreate')}>
                    <MenuItemContent>
                      <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
                      <MenuItemText>Criar Novo Post</MenuItemText>
                    </MenuItemContent>
                    <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
                  </MenuItem>
                  <MenuItem onPress={() => navigation.navigate('PostsAdmin')}>
                    <MenuItemContent>
                      <Ionicons name="create-outline" size={24} color={theme.colors.primary} />
                      <MenuItemText>Editar Posts</MenuItemText>
                    </MenuItemContent>
                    <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
                  </MenuItem>
                </Section>

                <Section>
                  <SectionTitle>Professores</SectionTitle>
                  <MenuItem onPress={() => navigation.navigate('TeacherCreate')}>
                    <MenuItemContent>
                      <Ionicons name="person-add-outline" size={24} color={theme.colors.secondary} />
                      <MenuItemText>Cadastrar Professor</MenuItemText>
                    </MenuItemContent>
                    <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
                  </MenuItem>
                  <MenuItem onPress={() => navigation.navigate('TeachersList')}>
                    <MenuItemContent>
                      <Ionicons name="people-outline" size={24} color={theme.colors.secondary} />
                      <MenuItemText>Listar Professores</MenuItemText>
                    </MenuItemContent>
                    <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
                  </MenuItem>
                </Section>

                <Section>
                  <SectionTitle>Alunos</SectionTitle>                  
                  <MenuItem onPress={() => navigation.navigate('StudentCreate')}>
                    <MenuItemContent>
                      <Ionicons name="person-add-outline" size={24} color={theme.colors.success} />
                      <MenuItemText>Cadastrar Aluno</MenuItemText>
                    </MenuItemContent>
                    <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
                  </MenuItem>
                  <MenuItem onPress={() => navigation.navigate('StudentsList')}>
                    <MenuItemContent>
                      <Ionicons name="school-outline" size={24} color={theme.colors.success} />
                      <MenuItemText>Listar Alunos</MenuItemText>
                    </MenuItemContent>
                    <Ionicons name="chevron-forward" size={24} color={theme.colors.gray} />
                  </MenuItem>
                </Section>
              </>
            )}

            <Section>
              <Button
                title="Sair da Conta"
                onPress={handleLogout}
                variant="danger"
                fullWidth
              />
            </Section>
          </Content>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default AdminScreen;

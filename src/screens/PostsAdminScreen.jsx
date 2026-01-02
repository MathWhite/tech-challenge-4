import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, Alert } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { postsAPI } from '../api/posts';
import { theme } from '../styles/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const PostCard = styled.View`
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

const PostTitle = styled.Text`
  font-size: ${props => props.theme.fontSize.lg}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const PostAuthor = styled.Text`
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
  background-color: ${props => props.variant === 'danger' ? props.theme.colors.danger : props.theme.colors.primary};
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

const PostsAdminScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await postsAPI.getAll();
      setPosts(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, title) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await postsAPI.delete(id);
              Alert.alert('Sucesso', 'Post excluído com sucesso');
              loadPosts();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o post');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const renderPost = ({ item }) => (
    <PostCard>
      <PostTitle numberOfLines={2}>{item.title}</PostTitle>
      <PostAuthor>Por: {item.author}</PostAuthor>
      <ActionsRow>
        <ActionButton onPress={() => navigation.navigate('PostEdit', { postId: item._id })}>
          <Ionicons name="create-outline" size={16} color="white" />
          <ActionButtonText>Editar</ActionButtonText>
        </ActionButton>
        <ActionButton variant="danger" onPress={() => handleDelete(item._id, item.title)}>
          <Ionicons name="trash-outline" size={16} color="white" />
          <ActionButtonText>Excluir</ActionButtonText>
        </ActionButton>
      </ActionsRow>
    </PostCard>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !loading && <EmptyText>Nenhum post cadastrado</EmptyText>
          }
        />
      </Container>
    </ThemeProvider>
  );
};

export default PostsAdminScreen;

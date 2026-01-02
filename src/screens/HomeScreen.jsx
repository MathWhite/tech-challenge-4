import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { postsAPI } from '../api/posts';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/useAuth';
import Input from '../components/Input';
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
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  gap: ${props => props.theme.spacing.sm}px;
`;

const PostCard = styled.TouchableOpacity`
  background-color: ${props => props.inactive ? '#e0e0e0' : props.theme.colors.white};
  padding: ${props => props.theme.spacing.md}px;
  margin: ${props => props.theme.spacing.sm}px ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  opacity: ${props => props.inactive ? 0.5 : 1};
`;

const PostTitle = styled.Text`
  font-size: ${props => props.theme.fontSize.lg}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.inactive ? '#777' : props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const PostAuthor = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.inactive ? '#999' : props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const PostDescription = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.inactive ? '#888' : props.theme.colors.text};
  line-height: 20px;
`;

const InactiveLabel = styled.Text`
  font-size: ${props => props.theme.fontSize.xs}px;
  color: ${props => props.theme.colors.danger};
  font-weight: ${props => props.theme.fontWeight.semibold};
  margin-top: ${props => props.theme.spacing.xs}px;
  text-transform: uppercase;
`;

const EmptyText = styled.Text`
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  margin-top: ${props => props.theme.spacing.xxl}px;
`;

const CreateButton = styled.TouchableOpacity`
  position: absolute;
  right: ${props => props.theme.spacing.md}px;
  bottom: ${props => props.theme.spacing.md}px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${props => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 8;
`;

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadPosts = async () => {
    try {
      const data = await postsAPI.getAll();
      setPosts(data);
      setAllPosts(data); // Guardar todos os posts para filtro local
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtro local de posts (como no TC3)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setPosts(allPosts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allPosts.filter(post => 
      post.title?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query)
    );
    setPosts(filtered);
  }, [searchQuery, allPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchQuery('');
    await loadPosts();
    setRefreshing(false);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const renderPost = ({ item }) => {
    const isInactive = item.isActive === false;
    
    return (
      <PostCard 
        onPress={() => navigation.navigate('PostRead', { postId: item._id })}
        inactive={isInactive}
      >
        <PostTitle numberOfLines={2} inactive={isInactive}>{item.title}</PostTitle>
        <PostAuthor inactive={isInactive}>Por: {item.author}</PostAuthor>
        {item.description && (
          <PostDescription numberOfLines={3} inactive={isInactive}>{item.description}</PostDescription>
        )}
        {isInactive && user?.role === 'professor' && (
          <InactiveLabel>Inativo</InactiveLabel>
        )}
      </PostCard>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <HeaderTitle>Posts</HeaderTitle>
          <SearchContainer>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Buscar por título, autor ou conteúdo..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            {searchQuery ? (
              <TouchableOpacity onPress={handleClearSearch} style={{ paddingTop: 8 }}>
                <Ionicons name="close-circle" size={24} color={theme.colors.gray} />
              </TouchableOpacity>
            ) : null}
          </SearchContainer>
        </Header>

        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !loading && <EmptyText>Nenhum post encontrado</EmptyText>
          }
        />

        {user?.role === 'professor' && (
          <CreateButton onPress={() => navigation.navigate('PostCreate')}>
            <Ionicons name="add" size={32} color="white" />
          </CreateButton>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default HomeScreen;

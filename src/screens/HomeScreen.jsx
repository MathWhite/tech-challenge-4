import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, RefreshControl, Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { postsAPI } from '../api/posts';
import { theme } from '../styles/theme';
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

const PostDescription = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.theme.colors.text};
  line-height: 20px;
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPosts();
      return;
    }

    try {
      setLoading(true);
      const data = await postsAPI.search(searchQuery);
      setPosts(data);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearchQuery('');
    await loadPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  const renderPost = ({ item }) => (
    <PostCard onPress={() => navigation.navigate('PostRead', { postId: item._id })}>
      <PostTitle numberOfLines={2}>{item.title}</PostTitle>
      <PostAuthor>Por: {item.author}</PostAuthor>
      {item.description && (
        <PostDescription numberOfLines={3}>{item.description}</PostDescription>
      )}
    </PostCard>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <HeaderTitle>Posts</HeaderTitle>
          <SearchContainer>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Buscar posts..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
            </View>
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

        <CreateButton onPress={() => navigation.navigate('PostCreate')}>
          <Ionicons name="add" size={32} color="white" />
        </CreateButton>
      </Container>
    </ThemeProvider>
  );
};

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { postsAPI } from '../api/posts';
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

const PostEditScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadPost = async () => {
    try {
      const post = await postsAPI.getById(postId);
      setTitle(post.title);
      setContent(post.content);
      setAuthor(post.author);
      setDescription(post.description || '');
      setIsActive(post.isActive !== undefined ? post.isActive : true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o post');
      console.error(error);
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !content || !author) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setSaving(true);
    try {
      await postsAPI.update(postId, { title, content, author, description, isActive });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o post');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

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
              label="Título *"
              value={title}
              onChangeText={setTitle}
              placeholder="Digite o título do post"
            />
            
            <Input
              label="Autor *"
              value={author}
              onChangeText={setAuthor}
              placeholder="Nome do autor"
            />
            
            <Input
              label="Descrição"
              value={description}
              onChangeText={setDescription}
              placeholder="Breve descrição do post"
              multiline
              numberOfLines={3}
            />
            
            <CheckboxContainer onPress={() => setIsActive(!isActive)}>
              <Checkbox checked={isActive}>
                {isActive && <CheckIcon>✓</CheckIcon>}
              </Checkbox>
              <CheckboxLabel>Post Ativo</CheckboxLabel>
            </CheckboxContainer>
            
            <Input
              label="Conteúdo *"
              value={content}
              onChangeText={setContent}
              placeholder="Conteúdo completo do post"
              multiline
              numberOfLines={10}
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

export default PostEditScreen;

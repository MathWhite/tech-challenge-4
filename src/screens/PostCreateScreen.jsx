import React, { useState } from 'react';
import { ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
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

const PostCreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !content || !author) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      await postsAPI.create({ title, content, author, description });
      Alert.alert('Sucesso', 'Post criado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o post');
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
            
            <Input
              label="Conteúdo *"
              value={content}
              onChangeText={setContent}
              placeholder="Conteúdo completo do post"
              multiline
              numberOfLines={10}
            />
            
            <Button
              title="Criar Post"
              onPress={handleCreate}
              loading={loading}
              fullWidth
            />
          </Content>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default PostCreateScreen;

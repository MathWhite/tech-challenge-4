import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { postsAPI } from '../api/posts';
import { theme } from '../styles/theme';
import Button from '../components/Button';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.View`
  padding: ${props => props.theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSize.xxl}px;
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const Author = styled.Text`
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const PostContent = styled.Text`
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.text};
  line-height: 24px;
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const CommentsSection = styled.View`
  margin-top: ${props => props.theme.spacing.lg}px;
  padding-top: ${props => props.theme.spacing.lg}px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.border};
`;

const SectionTitle = styled.Text`
  font-size: ${props => props.theme.fontSize.lg}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const CommentCard = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const CommentAuthor = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const CommentText = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.theme.colors.text};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PostReadScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPost = async () => {
    try {
      const data = await postsAPI.getById(postId);
      setPost(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o post');
      console.error(error);
      navigation.goBack();
    } finally {
      setLoading(false);
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

  if (!post) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ScrollView>
          <Content>
            <Title>{post.title}</Title>
            <Author>Por: {post.author}</Author>
            <PostContent>{post.content}</PostContent>

            {post.comments && post.comments.length > 0 && (
              <CommentsSection>
                <SectionTitle>Comentários ({post.comments.length})</SectionTitle>
                {post.comments.map((comment, index) => (
                  <CommentCard key={index}>
                    <CommentAuthor>{comment.author}</CommentAuthor>
                    <CommentText>{comment.comment}</CommentText>
                  </CommentCard>
                ))}
              </CommentsSection>
            )}
          </Content>
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default PostReadScreen;

import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { postsAPI } from '../api/posts';
import { theme } from '../styles/theme';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/useAuth';

const Container = styled(SafeAreaView)`
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
  background-color: ${props => props.theme.colors.card};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
`;

const CommentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const CommentMenuButton = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.xs}px;
`;

const CommentMenu = styled.View`
  position: absolute;
  top: 30px;
  right: 10px;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md}px;
  border: 1px solid ${props => props.theme.colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
  min-width: 120px;
  z-index: 100;
`;

const CommentMenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.theme.spacing.sm}px ${props => props.theme.spacing.md}px;
  gap: ${props => props.theme.spacing.sm}px;
`;

const CommentMenuText = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  color: ${props => props.variant === 'danger' ? props.theme.colors.danger : props.theme.colors.text};
`;

const EditCommentContainer = styled.View`
  margin-top: ${props => props.theme.spacing.xs}px;
`;

const EditActions = styled.View`
  flex-direction: row;
  gap: ${props => props.theme.spacing.sm}px;
  margin-top: ${props => props.theme.spacing.sm}px;
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

const CommentForm = styled.View`
  margin-top: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const CommentInputContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const PostReadScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [openMenuCommentId, setOpenMenuCommentId] = useState(null);
  const { user } = useAuth();

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

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Atenção', 'Por favor, digite um comentário');
      return;
    }

    setSubmittingComment(true);
    try {
      await postsAPI.addComment(postId, {
        author: user?.name || 'Usuário',
        comment: commentText,
      });
      
      setCommentText('');
      Alert.alert('Sucesso', 'Comentário adicionado!');
      
      // Recarregar o post para mostrar o novo comentário
      await loadPost();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o comentário');
      console.error(error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditingCommentText(commentText);
    setOpenMenuCommentId(null);
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingCommentText.trim()) {
      Alert.alert('Atenção', 'Por favor, digite um comentário');
      return;
    }

    try {
      await postsAPI.updateComment(postId, commentId, {
        comment: editingCommentText,
      });
      
      setEditingCommentId(null);
      setEditingCommentText('');
      Alert.alert('Sucesso', 'Comentário atualizado!');
      
      await loadPost();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o comentário');
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este comentário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await postsAPI.deleteComment(postId, commentId);
              Alert.alert('Sucesso', 'Comentário excluído!');
              setOpenMenuCommentId(null);
              await loadPost();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o comentário');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  const canEditComment = (comment) => {
    if (!user) return false;
    // Usuário pode editar apenas seus próprios comentários
    return comment.author === user.name || comment.author === user.username;
  };

  const canDeleteComment = (comment) => {
    if (!user) return false;
    // Professor pode deletar qualquer comentário
    if (user.role === 'professor') {
      return true;
    }
    // Aluno só pode deletar seus próprios comentários
    return comment.author === user.name || comment.author === user.username;
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 50 }} />
        </Container>
      </ThemeProvider>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <Content>
              <Title>{post.title}</Title>
              <Author>Por: {post.author}</Author>
              <PostContent>{post.content}</PostContent>

              <CommentsSection>
                <SectionTitle>Comentários ({post.comments?.length || 0})</SectionTitle>
                
                {/* Formulário de novo comentário */}
                <CommentForm>
                  <CommentInputContainer>
                    <Input
                      placeholder="Escreva seu comentário..."
                      value={commentText}
                      onChangeText={setCommentText}
                      multiline
                      numberOfLines={4}
                    />
                  </CommentInputContainer>
                  <Button
                    title="Adicionar Comentário"
                    onPress={handleAddComment}
                    loading={submittingComment}
                    disabled={!commentText.trim()}
                  />
                </CommentForm>

                {/* Lista de comentários */}
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <CommentCard key={comment._id || index}>
                      {editingCommentId === comment._id ? (
                        <EditCommentContainer>
                          <Input
                            placeholder="Editar comentário..."
                            value={editingCommentText}
                            onChangeText={setEditingCommentText}
                            multiline
                            numberOfLines={3}
                          />
                          <EditActions>
                            <Button
                              title="Salvar"
                              onPress={() => handleUpdateComment(comment._id)}
                              variant="primary"
                            />
                            <Button
                              title="Cancelar"
                              onPress={() => {
                                setEditingCommentId(null);
                                setEditingCommentText('');
                              }}
                              variant="secondary"
                            />
                          </EditActions>
                        </EditCommentContainer>
                      ) : (
                        <>
                          <CommentHeader>
                            <CommentAuthor>{comment.author}</CommentAuthor>
                            {(canEditComment(comment) || canDeleteComment(comment)) && (
                              <CommentMenuButton onPress={() => setOpenMenuCommentId(openMenuCommentId === comment._id ? null : comment._id)}>
                                <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.textSecondary} />
                              </CommentMenuButton>
                            )}
                          </CommentHeader>
                          <CommentText>{comment.comment}</CommentText>
                          
                          {openMenuCommentId === comment._id && (
                            <CommentMenu>
                              {canEditComment(comment) && (
                                <CommentMenuItem onPress={() => handleEditComment(comment._id, comment.comment)}>
                                  <Ionicons name="pencil" size={16} color={theme.colors.text} />
                                  <CommentMenuText>Editar</CommentMenuText>
                                </CommentMenuItem>
                              )}
                              {canDeleteComment(comment) && (
                                <CommentMenuItem onPress={() => handleDeleteComment(comment._id)}>
                                  <Ionicons name="trash" size={16} color={theme.colors.danger} />
                                  <CommentMenuText variant="danger">Excluir</CommentMenuText>
                                </CommentMenuItem>
                              )}
                            </CommentMenu>
                          )}
                        </>
                      )}
                    </CommentCard>
                  ))
                ) : (
                  <CommentText style={{ textAlign: 'center', marginTop: 16 }}>
                    Nenhum comentário ainda. Seja o primeiro!
                  </CommentText>
                )}
              </CommentsSection>
            </Content>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </ThemeProvider>
  );
};

export default PostReadScreen;

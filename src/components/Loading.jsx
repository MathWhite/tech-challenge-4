import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const LoadingText = styled.Text`
  margin-top: ${props => props.theme.spacing.md}px;
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Loading = ({ text = 'Carregando...' }) => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#007AFF" />
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
};

export default Loading;

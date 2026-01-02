import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const ButtonContainer = styled(TouchableOpacity)`
  background-color: ${props => 
    props.variant === 'primary' ? props.theme.colors.primary :
    props.variant === 'secondary' ? props.theme.colors.secondary :
    props.variant === 'danger' ? props.theme.colors.danger :
    props.variant === 'success' ? props.theme.colors.success :
    props.theme.colors.primary
  };
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.5 : 1};
  ${props => props.fullWidth && 'width: 100%;'}
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSize.md}px;
  font-weight: ${props => props.theme.fontWeight.semibold};
`;

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  fullWidth = false,
  ...props 
}) => {
  return (
    <ButtonContainer 
      onPress={onPress} 
      variant={variant}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </ButtonContainer>
  );
};

export default Button;

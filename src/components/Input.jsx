import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

const InputContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const Label = styled.Text`
  font-size: ${props => props.theme.fontSize.sm}px;
  font-weight: ${props => props.theme.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const StyledInput = styled(TextInput)`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md}px;
  padding: ${props => props.theme.spacing.md}px;
  font-size: ${props => props.theme.fontSize.md}px;
  color: ${props => props.theme.colors.text};
`;

const ErrorText = styled.Text`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.fontSize.xs}px;
  margin-top: ${props => props.theme.spacing.xs}px;
`;

const Input = ({ 
  label, 
  error, 
  multiline = false,
  numberOfLines = 1,
  ...props 
}) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput 
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default Input;

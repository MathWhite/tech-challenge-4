import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { AuthContext } from './AuthContext';
import api from '../api/axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário do SecureStore ao iniciar
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync('userData');
      const token = await SecureStore.getItemAsync('userToken');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para criptografar a palavra-passe usando SHA-256
  const encryptPassword = async (text) => {
    try {
      const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        text
      );
      return hash;
    } catch (error) {
      console.error('Erro ao criptografar:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      // Criptografa a palavra-passe
      const palavraPasse = await encryptPassword('secreta123');
           
      const requestBody = {
        email: email.trim(),
        senha: password.trim(),
        'palavra-passe': palavraPasse
      };
      
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));
      
      // Faz a requisição para a API
      const response = await api.post('/login', requestBody);

      // Extrai os dados da resposta
      const { token, user } = response.data;

      // Cria o objeto de dados do usuário
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: token
      };

      // Salva o token e os dados do usuário
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));

      setUser(userData);
      return { success: true };
      
    } catch (error) {
      console.error('Erro no login:', error);
      console.error('Status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      console.error('Response headers:', error.response?.headers);
      
      // Trata erros específicos da API
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 401) {
          if (message === 'Palavra-passe incorreta.') {
            return {
              success: false,
              message: 'Erro de autenticação do sistema. Contate o suporte.',
            };
          } else if (message === 'Email ou senha incorretos.') {
            return {
              success: false,
              message: 'Email ou senha incorretos.',
            };
          }
        }
        
        return {
          success: false,
          message: message || 'Erro ao fazer login',
        };
      }
      
      return {
        success: false,
        message: 'Erro ao conectar com o servidor. Verifique sua conexão.',
      };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userData');
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

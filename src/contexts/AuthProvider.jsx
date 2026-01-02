import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
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

  const login = async (email, password) => {
    try {
      // Tokens de exemplo (mesmos do TC3)
      const TOKENS = {
        professor: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvZmVzc29yIiwibmFtZSI6Ik1hdGhldXMiLCJpYXQiOjE3NTI2NjgzMzZ9.BQUrflZw8QktIBmqOVWiPvu0jDowJl_-SiBr9yCyPv0",
        aluno: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWx1bm8iLCJuYW1lIjoiTWF0aGV1cyIsImlhdCI6MTc1MjY2ODMzNn0.G6i94pkpNQQ5o-7pLpmNdSMbj1FfWpoBYn2U0oMBusU"
      };

      // Normaliza entradas
      const normalizedEmail = String(email || "").trim().toLowerCase();
      const normalizedPassword = String(password || "").trim();

      // Simulação de autenticação
      if (normalizedEmail === "professor@teste.com" && normalizedPassword === "1234") {
        const token = TOKENS.professor;
        const userData = {
          email: normalizedEmail,
          name: "Professor Matheus",
          role: "professor",
          token: token
        };

        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('userData', JSON.stringify(userData));

        setUser(userData);
        return { success: true };
      } else if (normalizedEmail === "aluno@teste.com" && normalizedPassword === "1234") {
        const token = TOKENS.aluno;
        const userData = {
          email: normalizedEmail,
          name: "Aluno Matheus",
          role: "aluno",
          token: token
        };

        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('userData', JSON.stringify(userData));

        setUser(userData);
        return { success: true };
      }

      return {
        success: false,
        message: 'Credenciais inválidas',
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: 'Erro ao fazer login',
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

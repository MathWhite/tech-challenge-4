import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/useAuth';

// Screens (vamos criar depois)
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PostReadScreen from '../screens/PostReadScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import PostsAdminScreen from '../screens/PostsAdminScreen';
import AdminScreen from '../screens/AdminScreen';
import TeachersListScreen from '../screens/TeachersListScreen';
import TeacherCreateScreen from '../screens/TeacherCreateScreen';
import TeacherEditScreen from '../screens/TeacherEditScreen';
import StudentsListScreen from '../screens/StudentsListScreen';
import StudentCreateScreen from '../screens/StudentCreateScreen';
import StudentEditScreen from '../screens/StudentEditScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para telas principais
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'PostsList') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="PostsList" 
        component={HomeScreen}
        options={{ title: 'Posts' }}
      />
      <Tab.Screen 
        name="Admin" 
        component={AdminScreen}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator Principal
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // ou uma tela de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
        }}
      >
        {!isAuthenticated ? (
          // Telas não autenticadas
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          // Telas autenticadas
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="PostRead" 
              component={PostReadScreen}
              options={{ title: 'Ler Post' }}
            />
            <Stack.Screen 
              name="PostCreate" 
              component={PostCreateScreen}
              options={{ title: 'Criar Post' }}
            />
            <Stack.Screen 
              name="PostsAdmin" 
              component={PostsAdminScreen}
              options={{ title: 'Gerenciar Posts' }}
            />
            <Stack.Screen 
              name="PostEdit" 
              component={PostEditScreen}
              options={{ title: 'Editar Post' }}
            />
            <Stack.Screen 
              name="TeachersList" 
              component={TeachersListScreen}
              options={{ title: 'Professores' }}
            />
            <Stack.Screen 
              name="TeacherCreate" 
              component={TeacherCreateScreen}
              options={{ title: 'Cadastrar Professor' }}
            />
            <Stack.Screen 
              name="TeacherEdit" 
              component={TeacherEditScreen}
              options={{ title: 'Editar Professor' }}
            />
            <Stack.Screen 
              name="StudentsList" 
              component={StudentsListScreen}
              options={{ title: 'Alunos' }}
            />
            <Stack.Screen 
              name="StudentCreate" 
              component={StudentCreateScreen}
              options={{ title: 'Cadastrar Aluno' }}
            />
            <Stack.Screen 
              name="StudentEdit" 
              component={StudentEditScreen}
              options={{ title: 'Editar Aluno' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

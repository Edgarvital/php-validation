import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Title, Input, ErrorMessage, Text } from './styles';
import api from '../../services/api';
import CustomButton from '../CustomButton';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      if (role === 'Admin') {
        navigate('/list-clients'); 
      } else {
        navigate('/client-home'); 
      }
    }
  }, [navigate]);

  async function login() {
    try {
      const response = await api.post('/api/user/login', { email, password });
      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);
        const { token, user_name, role } = response.data;  
        
        localStorage.setItem('token', token);  
        localStorage.setItem('user_name', user_name);  
        localStorage.setItem('role', role);  
        
        setErrorMessage('');  
  
        if (role === 'Admin') {
          navigate('/list-clients'); 
        } else {
          navigate('/client-home'); 
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.data || 'Erro ao realizar login.');
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <Container>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Exibir mensagem de erro, se houver */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <CustomButton type="submit">Login</CustomButton>
        <Text>Não possui cadastro? Solicite para um Administrador.</Text>
      </form>
    </Container>
  );
};

export default FormLogin;

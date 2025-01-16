import React from 'react';
import { Container, FormContainer } from './styles';
import FormLogin from '../../components/FormLogin';
import Navbar from '../../components/Navbar';

const LoginPage = () => {
  return (
    <Container>      
      <FormContainer>        
        <FormLogin />
      </FormContainer>
    </Container>
  );
};

export default LoginPage;

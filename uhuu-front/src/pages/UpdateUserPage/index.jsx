import React from 'react';
import { Container, FormContainer } from './styles';
import FormUpdateUser from '../../components/FormUpdateUser';

const UpdateUserPage = () => {
  return (
    <Container>      
      <FormContainer>        
        <FormUpdateUser/>
      </FormContainer>
    </Container>
  );
};

export default UpdateUserPage;

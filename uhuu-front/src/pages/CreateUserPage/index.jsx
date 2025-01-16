import React from 'react';
import { Container, FormContainer } from './styles';
import FormCreateUser from '../../components/FormCreateUser';

const CreateUserPage = () => {
  return (
    <Container>      
      <FormContainer>        
        <FormCreateUser />
      </FormContainer>
    </Container>
  );
};

export default CreateUserPage;

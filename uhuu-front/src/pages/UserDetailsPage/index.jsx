import React from 'react';
import { Container, FormContainer } from './styles';
import UserDetails from '../../components/UserDetails';

const UserDetailsPage = () => {
  return (
    <Container>      
      <FormContainer>        
        <UserDetails/>
      </FormContainer>
    </Container>
  );
};

export default UserDetailsPage;

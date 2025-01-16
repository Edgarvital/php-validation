import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4; /* Fundo claro */
  font-family: 'Arial', sans-serif;
`;

export const WelcomeMessage = styled.h1`
  font-size: 2rem;
  color: #333; /* Cor do texto */
  text-align: center;
  padding: 20px;
  background-color: #d23578; /* Cor de fundo personalizada */
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  padding: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  color: #d23578;
  margin-bottom: 20px;
`;

export const Text = styled.h3`
  color:rgb(0, 0, 0);
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #d23578;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

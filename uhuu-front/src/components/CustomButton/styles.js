import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin: 10px 0;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#d23578')};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#a8235e')};
  }
`;

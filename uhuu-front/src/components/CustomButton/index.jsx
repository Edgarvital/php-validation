import React from 'react';
import { StyledButton } from './styles';

const CustomButton = ({ children, onClick, type = 'button', disabled = false }) => {
  return (
    <StyledButton onClick={onClick} type={type} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;

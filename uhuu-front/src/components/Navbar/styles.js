import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000; /* Fundo preto */
  padding: 10px 20px;
  height: 60px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Espaço entre os botões */
`;

export const Logo = styled.div`
  color: #d23578; /* Rosa */
  font-size: 18px;
  font-weight: bold;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: #d23578; /* Rosa */
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  margin: 16px;

  &:hover {
    color: #fff; /* Branco no hover */
  }
`;

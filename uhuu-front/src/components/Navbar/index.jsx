import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarContainer, LeftSection, RightSection, NavButton, Logo } from "./styles";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); 

    setIsAuthenticated(!!token);
    setIsAdmin(role === "Admin"); 
  }, [navigate]);

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você já está desconectado.");
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("role");
    
    setIsAuthenticated(false); 
    setIsAdmin(false); 
    navigate("/"); 
    alert("Logout realizado com sucesso!");
  };

  const handleNavigateToClientList = () => {
    navigate("/list-clients"); 
  };

  const handleNavigateToClientRegistration = () => {
    navigate("/create-user"); 
  };

  return (
    <NavbarContainer>
      <LeftSection>
        <Logo>Uhuu.com</Logo>
        {isAuthenticated && isAdmin && ( 
          <>
            <NavButton onClick={handleNavigateToClientList}>Lista de Clientes</NavButton>
            <NavButton onClick={handleNavigateToClientRegistration}>Cadastro de Cliente</NavButton>
          </>
        )}
      </LeftSection>
      <RightSection>
        {!isAuthenticated && <NavButton>Login</NavButton>}
        {isAuthenticated && <NavButton onClick={handleLogout}>Logout</NavButton>}
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;

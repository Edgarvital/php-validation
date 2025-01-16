import React, { useEffect, useState } from "react";
import { Container, WelcomeMessage } from "./styles";

const ClientHomePage = () => {
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name");
    if (storedUserName) {
      setUserName(storedUserName); // Armazena o nome do usuário no estado
    }
  }, []);

  return (
    <Container>
      <WelcomeMessage>
        {userName ? `Bem-vindo, ${userName}!` : "Bem-vindo ao sistema!"}
      </WelcomeMessage>
    </Container>
  );
};

export default ClientHomePage;

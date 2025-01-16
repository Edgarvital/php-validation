import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa o hook useParams
import InputMask from 'react-input-mask';
import { Container, Title, Input } from './styles';
import api from '../../services/api';

const UserDetails = () => {
  const { id } = useParams(); // Captura o ID vindo da URL
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone_number: '',
    birth_date: '', // Certifique-se de que o estado inicial esteja vazio
    state: '',
    city: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

  
        const response = await api.get(`/api/user/${id}`, config);

        console.log("Id: " + id);

        // Ajusta o formato da data antes de atualizar o estado
        const userData = response.data;
        if (userData.birth_date) {
          userData.birth_date = userData.birth_date.slice(0, 10); // Extrai 'YYYY-MM-DD'
        }

        setUserData(userData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error.response?.data || error.message);
        alert('Erro ao carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]); // Executa o useEffect quando o ID mudar

  return (
    <Container>
      <Title>Detalhes do Cliente</Title>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form>
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              value={userData.name}
              disabled
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              disabled
            />
          </div>

          <div>
            <InputMask
              mask="999.999.999-99"
              value={userData.cpf}
              disabled
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  name="cpf"
                  placeholder="CPF (000.000.000-00)"
                />
              )}
            </InputMask>
          </div>

          <div>
            <InputMask
              mask="(99) 99999-9999"
              value={userData.phone_number}
              disabled
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  name="phone_number"
                  placeholder="Telefone ((00) 00000-0000)"
                />
              )}
            </InputMask>
          </div>

          <div>
            <Input
              type="date"
              name="birth_date"
              placeholder="Data de Nascimento"
              value={userData.birth_date}
              disabled
            />
          </div>

          <div>
            <Input
              type="text"
              name="state"
              placeholder="Estado"
              value={userData.state}
              disabled
            />
          </div>

          <div>
            <Input
              type="text"
              name="city"
              placeholder="Cidade"
              value={userData.city}
              disabled
            />
          </div>
        </form>
      )}
    </Container>
  );
};

export default UserDetails;

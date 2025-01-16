import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Container, Title, Input, ErrorMessage } from './styles';
import api from '../../services/api';
import CustomButton from '../CustomButton';
import { useNavigate, useParams } from 'react-router-dom';

const FormUpdateUser = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone_number: '',
    birth_date: '',
    state: '',
    city: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Definir loading como true inicialmente
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Iniciar o carregamento
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Faz a requisição GET para recuperar os dados do usuário
        const response = await api.get(`/api/user/${id}`, config);

        // Ajusta o formato da data de nascimento
        const userData = response.data;
        if (userData.birth_date) {
          userData.birth_date = userData.birth_date.slice(0, 10); // Formata a data como 'YYYY-MM-DD'
        }

        setFormData(userData); // Preenche os dados do formulário
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error.response?.data || error.message);
        alert('Erro ao carregar os dados do usuário.');
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchUserData();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(`/api/user/${id}`, formData, config);
      if (response.status === 200) {
        console.log('Atualização bem-sucedida:', response.data);
        setErrors({});

        navigate('/list-clients');
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.data || {});
      } else {
        console.error('Erro ao atualizar usuário:', error.response?.data || error.message);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container>
      <Title>Atualizar Cliente</Title>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <ErrorMessage>{errors.name[0]}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <ErrorMessage>{errors.email[0]}</ErrorMessage>}
          </div>

          <div>
            <InputMask
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={(e) => handleChange({ target: { name: 'cpf', value: e.target.value } })}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  name="cpf"
                  placeholder="CPF (000.000.000-00)"
                  required
                />
              )}
            </InputMask>
            {errors.cpf && <ErrorMessage>{errors.cpf[0]}</ErrorMessage>}
          </div>

          <div>
            <InputMask
              mask="(99) 99999-9999"
              value={formData.phone_number}
              onChange={(e) =>
                handleChange({ target: { name: 'phone_number', value: e.target.value } })
              }
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  name="phone_number"
                  placeholder="Telefone ((00) 00000-0000)"
                  required
                />
              )}
            </InputMask>
            {errors.phone_number && <ErrorMessage>{errors.phone_number[0]}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="date"
              name="birth_date"
              placeholder="Data de Nascimento"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
            {errors.birth_date && <ErrorMessage>{errors.birth_date[0]}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="text"
              name="state"
              placeholder="Estado"
              value={formData.state}
              onChange={handleChange}
              required
            />
            {errors.state && <ErrorMessage>{errors.state[0]}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="text"
              name="city"
              placeholder="Cidade"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <ErrorMessage>{errors.city[0]}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <ErrorMessage>{errors.password[0]}</ErrorMessage>}
          </div>

          <CustomButton type="submit" disabled={loading}>
            {loading ? 'Atualizando...' : 'Atualizar'}
          </CustomButton>
        </form>
      )}
    </Container>
  );
};

export default FormUpdateUser;

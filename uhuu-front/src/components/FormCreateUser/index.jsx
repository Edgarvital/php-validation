import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Container, Title, Input, ErrorMessage } from './styles';
import api from '../../services/api';
import CustomButton from '../CustomButton';
import { useNavigate } from 'react-router-dom';

const FormCreateUser = () => {
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
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); // Hook para navegação

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

      const response = await api.post('/api/user', formData, config); // Substituir pelo método correto de envio de dados para criação
      if (response.status === 201) {
        console.log('Cadastro bem-sucedido:', response.data);
        setErrors({});

        // Redireciona para a lista de clientes após o cadastro
        navigate('/list-clients');
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.data || {});
      } else {
        console.error('Erro ao cadastrar usuário:', error.response?.data || error.message);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container>
      <Title>Cadastro de Cliente</Title>
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
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </CustomButton>
      </form>
    </Container>
  );
};

export default FormCreateUser;

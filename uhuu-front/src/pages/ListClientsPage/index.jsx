import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ClientTable, Pagination, Loader, ActionButtons, ActionButton } from "./styles";
import { FaEye, FaEdit, FaTrashAlt, FaPowerOff, FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

const ListClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchColumn, setSearchColumn] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  
  const [resultsPerPage, setResultsPerPage] = useState(20);

  // Estados para ordenação
  const [orderByColumn, setOrderByColumn] = useState("name");
  const [columnSortDirection, setColumnSortDirection] = useState("desc");

  // Estado para seleção de múltiplos clientes
  const [selectedClients, setSelectedClients] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false); // Ativa o modo de seleção

  const fetchClients = async (page, searchColumn = "", searchValue = "", perPage = 20, orderByColumn = "name", columnSortDirection = "asc") => {
    setIsLoading(true);
    setClients([]);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`http://localhost:8000/api/user?page=${page}&search_columns=${searchColumn}&search_value=${searchValue}&per_page=${perPage}&order_by_column=${orderByColumn}&column_sort_direction=${columnSortDirection}`, config);
      setClients(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewClick = (clientId) => {
    navigate(`/user-details/${clientId}`);
  };

  const handleUpdateClick = (clientId) => {
    navigate(`/update-user/${clientId}`);
  };

  const toggleClientStatus = async (clientId) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/user/switchIsActive/${clientId}`, {}, config);

      if (response.status === 200) {
        fetchClients(currentPage, searchColumn, searchValue, resultsPerPage, orderByColumn, columnSortDirection);
      }
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClient = async (clientId) => {
    const confirmation = window.confirm("Tem certeza que deseja excluir este cliente?");

    if (confirmation) {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.delete(`http://localhost:8000/api/user/${clientId}`, config);

        if (response.status === 200) {
          fetchClients(currentPage, searchColumn, searchValue, resultsPerPage, orderByColumn, columnSortDirection);
        }
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const massDeleteClients = async () => {
    const confirmation = window.confirm("Tem certeza que deseja excluir todos os clientes selecionados?");

    if (confirmation && selectedClients.length > 0) {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.post(`http://localhost:8000/api/user/massDelete`, { user_ids: selectedClients }, config);

        if (response.status === 200) {
          setSelectedClients([]); 
          fetchClients(currentPage, searchColumn, searchValue, resultsPerPage, orderByColumn, columnSortDirection);
        }
      } catch (error) {
        console.error("Erro ao excluir clientes em massa:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = () => {
    fetchClients(1, searchColumn, searchValue, resultsPerPage, orderByColumn, columnSortDirection);
    setCurrentPage(1);
  };

  const handleResultsPerPageChange = (e) => {
    setResultsPerPage(e.target.value);
    fetchClients(1, searchColumn, searchValue, e.target.value, orderByColumn, columnSortDirection);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    const newDirection = columnSortDirection === "asc" ? "desc" : "asc";
    setOrderByColumn(column);
    setColumnSortDirection(newDirection);
    fetchClients(currentPage, searchColumn, searchValue, resultsPerPage, column, newDirection);
  };

  const toggleSelectClient = (clientId) => {
    if (selectedClients.includes(clientId)) {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    } else {
      setSelectedClients([...selectedClients, clientId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map(client => client.id));
    }
  };

  useEffect(() => {
    fetchClients(currentPage, searchColumn, searchValue, resultsPerPage, orderByColumn, columnSortDirection);
  }, [currentPage, resultsPerPage, orderByColumn, columnSortDirection]);

  return (
    <Container>
      <h1>Lista de Clientes</h1>

      <div>
        <select value={searchColumn} onChange={(e) => setSearchColumn(e.target.value)}>
          <option value="name">Nome</option>
          <option value="email">Email</option>
          <option value="cpf">CPF</option>
          <option value="phone_number">Telefone</option>
          <option value="city">Cidade</option>
          <option value="state">Estado</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Pesquisar"
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      {/* Botão para ativar seleção em massa */}
      <div>
        <button onClick={() => setIsSelecting(!isSelecting)}>
          {isSelecting ? "Cancelar Seleção" : "Selecionar em Massa"}
        </button>
        {isSelecting && (
          <button onClick={massDeleteClients} disabled={selectedClients.length === 0}>
            Excluir Selecionados
          </button>
        )}
      </div>

      {isLoading && <Loader>Carregando os dados...</Loader>}

      {!isLoading && (
        <ClientTable>
          <thead>
            <tr>
              {isSelecting && (
                <th>
                  <input type="checkbox" onChange={toggleSelectAll} checked={selectedClients.length === clients.length} />
                </th>
              )}
              <th onClick={() => handleSort("name")}>
                Nome 
                {orderByColumn === "name" && (columnSortDirection === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort("email")}>
                Email
                {orderByColumn === "email" && (columnSortDirection === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort("cpf")}>
                CPF
                {orderByColumn === "cpf" && (columnSortDirection === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort("phone_number")}>
                Telefone
                {orderByColumn === "phone_number" && (columnSortDirection === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort("city")}>
                Cidade
                {orderByColumn === "city" && (columnSortDirection === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort("state")}>
                Estado
                {orderByColumn === "state" && (columnSortDirection === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                {isSelecting && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => toggleSelectClient(client.id)}
                    />
                  </td>
                )}
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.cpf}</td>
                <td>{client.phone_number}</td>
                <td>{client.city}</td>
                <td>{client.state}</td>
                <td>{client.is_active ? "Ativo" : "Inativo"}</td>
                <td>
                  <ActionButtons>
                  <ActionButton className="view" onClick={() => handleViewClick(client.id)}>
                      <FaEye />
                    </ActionButton>
                    <ActionButton className="edit" onClick={() => handleUpdateClick(client.id)}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      className="delete"
                      onClick={() => deleteClient(client.id)}
                    >
                      <FaTrashAlt />
                    </ActionButton>
                    <ActionButton
                      className="toggle"
                      onClick={() => toggleClientStatus(client.id)}
                    >
                      <FaPowerOff />
                    </ActionButton>
                  </ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientTable>
      )}

      <div>
        <label>Resultados por página:</label>
        <select value={resultsPerPage} onChange={handleResultsPerPageChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <Pagination>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>« Anterior</button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Próximo »</button>
        )}
      </Pagination>
    </Container>
  );
};

export default ListClientsPage;

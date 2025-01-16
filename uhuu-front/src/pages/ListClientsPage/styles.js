import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;  
  align-items: center;  
  flex-direction: column;  
  min-height: 100vh;  

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
`;

export const ClientTable = styled.table`
  width: 90%;  
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 10px;  
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #d23578;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 14px;

    &:hover {
      background-color: #f0f0f0;
    }

    &.active {
      background-color: #d23578;
      color: white;
      font-weight: bold;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const ActionButton = styled.button`
  background-color: ${(props) => props.bgColor || "#fff"};
  color: ${(props) => props.color || "#333"};
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => props.hoverBgColor || "#f0f0f0"};
  }

  &.edit {
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  }

  &.delete {
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: #d32f2f;
    }
  }

  &.view {
    background-color: #2196f3;
    color: white;
    &:hover {
      background-color: #1976d2;
    }
  }

  &.toggle {
    background-color: #ff9800;
    color: white;
    &:hover {
      background-color: #fb8c00;
    }
  }
`;

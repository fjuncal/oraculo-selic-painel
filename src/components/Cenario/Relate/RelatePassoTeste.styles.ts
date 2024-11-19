import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  text-align: center;
`;

export const Select = styled.select`
  margin: 10px 0 20px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Table = styled.table`
  margin: 20px auto;
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
`;

export const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 2px solid #ddd;
  text-align: left;
  font-weight: bold;
  background-color: #f4f4f4;
`;
export const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e0f7fa;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

export const RelateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #1976d2;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export const DetalhesButton = styled.button`
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #3730a3;
  }
`;

export const NavigationButton = styled.button`
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #3730a3;
  }

  &:disabled {
    background-color: #bbb; /* Cor neutra para estado desabilitado */
    cursor: not-allowed;
  }
`;

interface SelectButtonProps {
  isSelected: boolean;
}
export const SelectButton = styled.button<SelectButtonProps>`
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${(props) => (props.isSelected ? "#22c55e" : "#4f46e5")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.isSelected ? "#16a34a" : "#3730a3")};
  }

  &:disabled {
    background-color: #b0b0b0; /* Cinza para estado desabilitado */
    color: #ffffff; /* Mantém o texto visível */
    cursor: not-allowed; /* Indica que está desabilitado */
  }
`;

// Estilo para o contêiner das tabelas
export const TablesContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableWrapper = styled.div`
  flex: 1;
  overflow: auto; /* Para rolagem horizontal, se necessário */
`;

export const SearchAndTableContainer = styled.div`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  display: block;
  width: 80%; /* Limitar a largura do campo de busca */
  max-width: 400px; /* Largura máxima para telas grandes */
  margin: 0 auto 10px auto; /* Centralizar e adicionar espaço abaixo */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: #fff;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente (se necessário) */
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f3f4f6;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap; /* Permite quebra de linha em telas menores */
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

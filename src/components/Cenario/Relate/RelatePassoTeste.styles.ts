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

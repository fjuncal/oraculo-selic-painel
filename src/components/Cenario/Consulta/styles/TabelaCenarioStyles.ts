import styled from "styled-components";

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

export const Th = styled.th`
  padding: 10px 12px;
  background-color: #4f46e5;
  color: #fff;
  font-weight: bold;
  text-align: left;
  font-size: 0.85rem;
`;

export const Td = styled.td`
  padding: 10px 12px;
  font-size: 0.85rem;
  color: #333;
  border-bottom: 1px solid #eee;
`;

export const StyledRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const ActionButton = styled.button`
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

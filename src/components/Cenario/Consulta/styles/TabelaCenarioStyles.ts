import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  background-color: #f2f2f2;
  font-weight: bold;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #e0e0e0;
  }
`;

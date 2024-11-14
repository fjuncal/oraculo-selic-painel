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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

export const Button = styled.button`
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

export const ContentWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative; /* Necessário para o CloseButton ser posicionado corretamente */
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
`;
export const CloseButton = styled.button`
  position: absolute; /* Posiciona dentro do ModalContent */
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  z-index: 10;

  &:hover {
    color: #ff0000; /* Muda a cor ao passar o mouse */
  }
`;

export const DetailTable = styled.div`
  margin-top: 20px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

export const DetailValue = styled.span`
  color: #333;
  text-align: right;
`;

export const ContentWrapper = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;
  overflow-x: auto;
`;

export const Button = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #3730a3;
  }
`;
export const BackIcon = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s ease;

  display: inline-flex;
  align-items: center;

  &:hover {
    color: #3730a3;
  }
`;

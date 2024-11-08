import styled from "styled-components";

interface Message {
  id: number;
  content: string;
  status: string;
  created_at: string;
}

interface MessageTableProps {
  messages: Message[];
  onStatusClick: (id: number) => void;
}
export default function MessageTable({
  messages,
  onStatusClick,
}: MessageTableProps) {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Conteúdo</Th>
            <Th>Status</Th>
            <Th>Data de Criação</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <StyledRow key={message.id}>
              <Td>{message.id}</Td>
              <Td>{message.content}</Td>
              <Td>{message.status}</Td>
              <Td>{new Date(message.created_at).toLocaleDateString()}</Td>
              <Td>
                <ActionButton onClick={() => onStatusClick(message.id)}>
                  Ver Status
                </ActionButton>
              </Td>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 10px 12px;
  background-color: #4f46e5;
  color: #fff;
  font-weight: bold;
  text-align: left;
  font-size: 0.85rem;
`;

const Td = styled.td`
  padding: 10px 12px;
  font-size: 0.85rem;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const StyledRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ActionButton = styled.button`
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

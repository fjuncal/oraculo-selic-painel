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
          {messages &&
            messages.map((message) => (
              <StyledRow key={message.id}>
                <Td>{message.id}</Td>
                <Td>{message.content}</Td>
                <Td>{message.status}</Td>
                <Td>{new Date(message.created_at).toLocaleDateString()}</Td>
                <Td>
                  <button onClick={() => onStatusClick(message.id)}>
                    Ver Status
                  </button>
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
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: 12px 15px;
  background-color: #0070f3;
  color: #fff;
  font-weight: bold;
  text-align: left;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 12px 15px;
  font-size: 0.9rem;
  color: #333;
  border-bottom: 1px solid #ddd;
`;

const StyledRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #e0e7ff;
  }
`;

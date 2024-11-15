import styled from "styled-components";

interface Message {
  id: number;
  codigoMensagem: string;
  canal: string;
  xml: string;
  stringSelic: string;
  statusFinal: string;
  dataInclusao: string;
  correlationId: string;
}

interface MessageTableProps {
  messages: Message[];
  onStatusClick: (correlationId: string) => void;
}
export default function MessageTable({
  messages,
  onStatusClick,
}: MessageTableProps) {
  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Correl ID</Th>
            <Th>Código</Th>
            <Th>Canal</Th>
            <Th>Status Final</Th>
            <Th>Data de Inclusão</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <StyledRow key={message.id}>
              <Td>{message.id}</Td>
              <Td>{message.correlationId}</Td>
              <Td>{message.codigoMensagem}</Td>
              <Td>{message.canal}</Td>
              <Td>{message.statusFinal}</Td>
              <Td>{formatDateTime(message.dataInclusao)}</Td>
              <Td>
                <ActionButton
                  onClick={() => onStatusClick(message.correlationId)}
                >
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

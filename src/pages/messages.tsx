import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

interface Message {
  id: number;
  content: string;
  status: string;
  created_at: string;
}

interface MessageStatus {
  sent: { status: string; detail: string };
  arrived: { status: string; detail: string };
  processed: { status: string; detail: string };
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchContent, setSearchContent] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedMessageStatus, setSelectedMessageStatus] =
    useState<MessageStatus | null>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/list`)
      .then((response) => {
        setMessages(response.data);
        setFilteredMessages(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

  // Função para aplicar filtros
  useEffect(() => {
    let filtered: Message[] = [];
    if (messages) {
      filtered = messages.filter((message) => {
        const matchesContent = message.content
          .toLowerCase()
          .includes(searchContent.toLowerCase());
        const matchesStatus = statusFilter
          ? message.status === statusFilter
          : true;
        const matchesDate =
          startDate && endDate
            ? new Date(message.created_at) >= new Date(startDate) &&
              new Date(message.created_at) <= new Date(endDate)
            : true;

        return matchesContent && matchesStatus && matchesDate;
      });
    }

    setFilteredMessages(filtered);
  }, [searchContent, statusFilter, startDate, endDate, messages]);

  const fetchMessageStatus = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8086/status?message_id=${id}`
      );
      setSelectedMessageStatus(response.data);
      setSelectedMessageId(id);
      setError(""); // Limpa o erro anterior
    } catch (err) {
      setError("Não foi possível obter o status da mensagem.");
      console.error(err);
    }
  };

  return (
    <PageContainer>
      <Title>Lista de Mensagens</Title>
      <FiltersContainer>
        <Input
          type="text"
          placeholder="Buscar por conteúdo"
          value={searchContent}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchContent(e.target.value)
          }
        />
        <Select
          value={statusFilter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">Todos os Status</option>
          <option value="RECEIVED">Recebido</option>
          <option value="PROCESSING">Processando</option>
          <option value="FAILED">Falhou</option>
          <option value="COMPLETED">Completo</option>
        </Select>
        <Input
          type="date"
          value={startDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setStartDate(e.target.value)
          }
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEndDate(e.target.value)
          }
        />
      </FiltersContainer>
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
            {filteredMessages &&
              filteredMessages.map((message) => (
                <StyledRow key={message.id}>
                  <Td>{message.id}</Td>
                  <Td>{message.content}</Td>
                  <Td>{message.status}</Td>
                  <Td>{new Date(message.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <button onClick={() => fetchMessageStatus(message.id)}>
                      Ver Status
                    </button>
                  </Td>
                </StyledRow>
              ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedMessageStatus && selectedMessageId && (
        <StatusContainer>
          <h2>Status da Mensagem ID: {selectedMessageId}</h2>
          <p>
            <strong>Envio:</strong> {selectedMessageStatus.sent.status} -{" "}
            {selectedMessageStatus.sent.detail}
          </p>
          <p>
            <strong>Chegada:</strong> {selectedMessageStatus.arrived.status} -{" "}
            {selectedMessageStatus.arrived.detail}
          </p>
          <p>
            <strong>Processamento:</strong>{" "}
            {selectedMessageStatus.processed.status} -{" "}
            {selectedMessageStatus.processed.detail}
          </p>
        </StatusContainer>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
`;

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

const StatusContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

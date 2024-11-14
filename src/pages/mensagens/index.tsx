import MessageDetailsModal from "@/components/Mensagem/Consulta/MessageDetailsModal";
import MessageFilters from "@/components/Mensagem/Consulta/MessageFilters";
import MessageTable from "@/components/Mensagem/Consulta/MessageTable";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Message {
  id: number;
  codigoMensagem: string;
  canal: string;
  xml: string;
  stringSelic: string;
  statusFinal: string; // Exibe o status final na tabela
  dataInclusao: string;
  correlationId: string;
}

export interface MessageStatus {
  sent: { status: string; detail: string };
  arrived: { status: string; detail: string };
  processed: { status: string; detail: string };
}

export default function Mensagens() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchContent, setSearchContent] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedMessageStatus, setSelectedMessageStatus] =
    useState<MessageStatus | null>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  useEffect(() => {
    if (messages) {
      const filtered = messages.filter((message) => {
        const matchesContent = message.codigoMensagem
          .toLowerCase()
          .includes(searchContent.toLowerCase());
        const matchesStatus = statusFilter
          ? message.statusFinal === statusFilter // Filtra pelo status final
          : true;
        const matchesDate =
          startDate && endDate
            ? new Date(message.dataInclusao) >= new Date(startDate) &&
              new Date(message.dataInclusao) <= new Date(endDate)
            : true;
        return matchesContent && matchesStatus && matchesDate;
      });
      setFilteredMessages(filtered);
    }
  }, [searchContent, statusFilter, startDate, endDate, messages]);

  const fetchMessageStatus = async (correlationId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/status?correlationId=${correlationId}`
      );
      console.log(response.data);

      setSelectedMessageStatus(response.data);
      setSelectedMessageId(correlationId);
      setError("");
      setIsModalOpen(true);
    } catch (err) {
      setError("Não foi possível obter o status da mensagem.");
      console.error(err);
    }
  };

  return (
    <PageContainer>
      <Title>Lista de Mensagens</Title>
      <MessageFilters
        searchContent={searchContent}
        setSearchContent={setSearchContent}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <MessageTable
        messages={filteredMessages}
        onStatusClick={fetchMessageStatus}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <MessageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messageId={selectedMessageId}
        status={selectedMessageStatus}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #4f46e5;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
`;

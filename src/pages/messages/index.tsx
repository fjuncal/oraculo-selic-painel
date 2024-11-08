import MessageDetailsModal from "@/components/MessageDetailsModal";
import MessageFilters from "@/components/MessageFilters";
import MessageStatusDetails from "@/components/MessageStatusDetails";
import MessageTable from "@/components/MessageTable";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Message {
  id: number;
  content: string;
  status: string;
  created_at: string;
}

export interface MessageStatus {
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

  const fetchMessageStatus = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/status?message_id=${id}`
      );
      setSelectedMessageStatus(response.data);
      setSelectedMessageId(id);
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

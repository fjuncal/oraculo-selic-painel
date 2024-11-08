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

  const fetchMessageStatus = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/status?message_id=${id}`
      );
      setSelectedMessageStatus(response.data);
      setSelectedMessageId(id);
      setError("");
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
      {selectedMessageStatus && selectedMessageId && (
        <MessageStatusDetails
          messageId={selectedMessageId}
          status={selectedMessageStatus}
        />
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

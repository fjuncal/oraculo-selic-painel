import styled from "styled-components";

interface MessageStatus {
  sent: { status: string; detail: string };
  arrived: { status: string; detail: string };
  processed: { status: string; detail: string };
}

interface MessageStatusDetailsProps {
  messageId: number;
  status: MessageStatus;
}

export default function MessageStatusDetails({
  messageId,
  status,
}: MessageStatusDetailsProps) {
  return (
    <StatusContainer>
      <h2>Status da Mensagem ID: {messageId}</h2>
      <p>
        <strong>Envio:</strong> {status.sent.status} - {status.sent.detail}
      </p>
      <p>
        <strong>Chegada:</strong> {status.arrived.status} -{" "}
        {status.arrived.detail}
      </p>
      <p>
        <strong>Processamento:</strong> {status.processed.status} -{" "}
        {status.processed.detail}
      </p>
    </StatusContainer>
  );
}

const StatusContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

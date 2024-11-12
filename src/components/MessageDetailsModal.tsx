import styled from "styled-components";
import { MessageStatus } from "../pages/messages/index";

interface MessageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string | null;
  status: MessageStatus | null;
}

export default function MessageDetailsModal({
  isOpen,
  onClose,
  messageId,
  status,
}: MessageDetailsModalProps) {
  if (!isOpen || !status || messageId === null) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Status da Mensagem ID: {messageId}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          <StatusRow>
            <StatusIcon status={status.sent.status} />
            <StatusText isError={status.sent.status === "NÃO PROCESSADO"}>
              <strong>Envio:</strong> {status.sent.status} -{" "}
              {status.sent.detail}
            </StatusText>
          </StatusRow>
          <Divider />
          <StatusRow>
            <StatusIcon status={status.arrived.status} />
            <StatusText isError={status.arrived.status === "NÃO PROCESSADO"}>
              <strong>Chegada:</strong> {status.arrived.status} -{" "}
              {status.arrived.detail}
            </StatusText>
          </StatusRow>
          <Divider />
          <StatusRow>
            <StatusIcon status={status.processed.status} />
            <StatusText isError={status.processed.status === "NÃO PROCESSADO"}>
              <strong>Processamento:</strong> {status.processed.status} -{" "}
              {status.processed.detail}
            </StatusText>
          </StatusRow>
        </Content>
      </ModalContainer>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: #333;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIcon = styled.div<{ status: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "NÃO PROCESSADO"
      ? "red"
      : props.status === "ENVIANDO"
      ? "#4f46e5"
      : props.status === "EM_PROCESSAMENTO"
      ? "#34d399"
      : props.status === "PROCESSADO"
      ? "#f97316"
      : "#333"};
`;

const StatusText = styled.p<{ isError: boolean }>`
  font-size: 0.95rem;
  color: ${(props) => (props.isError ? "red" : "#25b818")};
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 8px 0;
`;

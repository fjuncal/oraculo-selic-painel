import {
  CloseButton,
  ModalContent,
} from "@/components/PassoTeste/Consulta/styles/PassoTesteStyles";
import {
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "@/components/PassoTeste/Form/styles";
import { useRef } from "react";

interface RelacionamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  passoTeste: Record<string, any> | null;
}

const RelacionamentoModal: React.FC<RelacionamentoModalProps> = ({
  isOpen,
  onClose,
  passoTeste,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !passoTeste) return null;

  // Filtra os atributos que não devem ser exibidos
  const filteredEntries = Object.entries(passoTeste).filter(
    ([key]) => key !== "stringSelic" && key !== "xml"
  );

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fecha o modal se o clique ocorreu fora do conteúdo
    }
  };
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent ref={modalRef}>
        <ModalHeader>
          <ModalTitle>Detalhes do Passo Teste</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          {filteredEntries.map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</strong>{" "}
              {value}
            </p>
          ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RelacionamentoModal;

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
  if (!isOpen || !passoTeste) return null;

  // Filtra os atributos que não devem ser exibidos
  const filteredEntries = Object.entries(passoTeste).filter(
    ([key]) => key !== "stringSelic" && key !== "xml"
  );

  return (
    <ModalOverlay>
      <ModalContent>
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

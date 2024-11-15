import { useState } from "react";
import {
  Overlay,
  ModalContent,
  Button,
  ContentWrapper,
  DetailLabel,
  DetailRow,
  DetailTable,
  DetailValue,
  BackIcon,
  CloseIcon,
} from "./styles/PassoTesteStyles";
import { FiArrowLeft, FiEye, FiX } from "react-icons/fi";
import { PassoTeste } from "./PassoTesteTabela";

interface PassoTesteModalProps {
  passoTeste: PassoTeste | null;
  onClose: () => void;
}

export default function ModalCenario({
  passoTeste,
  onClose,
}: PassoTesteModalProps) {
  const [secondaryModalContent, setSecondaryModalContent] = useState<
    string | null
  >(null);

  if (!passoTeste) return null;

  const fields = [
    { label: "ID", value: passoTeste.id },
    { label: "Descrição", value: passoTeste.descricao },
    { label: "Tipo de Cenário", value: passoTeste.tipoPassoTeste },
    { label: "Canal", value: passoTeste.canal },
    { label: "Código da Mensagem", value: passoTeste.codigoMsg },
    { label: "Conta Cedente", value: passoTeste.contaCedente },
    { label: "Conta Cessionário", value: passoTeste.contaCessionaria },
    { label: "Emissor", value: passoTeste.emissor },
    { label: "Valor Financeiro", value: passoTeste.valorFinanceiro },
  ];

  const handleOpenSecondaryModal = (content: string) => {
    setSecondaryModalContent(content);
  };

  const closeSecondaryModal = () => {
    setSecondaryModalContent(null);
  };

  return (
    <>
      <Overlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2 style={{ textAlign: "center" }}>Detalhes do Passo Teste</h2>
          <CloseIcon onClick={onClose} aria-label="Fechar">
            <FiX />
          </CloseIcon>{" "}
          <DetailTable>
            {fields.map(
              (field, index) =>
                field.value && (
                  <DetailRow key={index}>
                    <DetailLabel>{field.label}:</DetailLabel>
                    <DetailValue style={{ fontWeight: "bold" }}>
                      {field.value}
                    </DetailValue>
                  </DetailRow>
                )
            )}
            {passoTeste.xml && (
              <DetailRow>
                <DetailLabel>XML:</DetailLabel>
                <DetailValue>
                  <Button
                    onClick={() => handleOpenSecondaryModal(passoTeste.xml)}
                  >
                    <FiEye size={16} />
                    XML
                  </Button>
                </DetailValue>
              </DetailRow>
            )}
            {passoTeste.stringSelic && (
              <DetailRow>
                <DetailLabel>String Selic:</DetailLabel>
                <DetailValue>
                  <Button
                    onClick={() =>
                      handleOpenSecondaryModal(passoTeste.stringSelic)
                    }
                  >
                    <FiEye size={16} />
                    String Selic
                  </Button>
                </DetailValue>
              </DetailRow>
            )}
          </DetailTable>
        </ModalContent>
      </Overlay>

      {secondaryModalContent && (
        <Overlay>
          <ModalContent>
            <BackIcon onClick={closeSecondaryModal} aria-label="Voltar">
              <FiArrowLeft />
            </BackIcon>{" "}
            <h2 style={{ textAlign: "center" }}>XML ou String Selic</h2>
            <ContentWrapper>
              <pre>{secondaryModalContent}</pre>
            </ContentWrapper>
          </ModalContent>
        </Overlay>
      )}
    </>
  );
}

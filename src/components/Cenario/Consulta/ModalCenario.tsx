import { useState } from "react";
import { Cenario } from "./CenarioTabela";
import {
  Overlay,
  ModalContent,
  CloseButton,
  Button,
  ContentWrapper,
  DetailLabel,
  DetailRow,
  DetailTable,
  DetailValue,
  BackIcon,
} from "./styles/TabelaCenarioStyles";
import { FiArrowLeft, FiEye } from "react-icons/fi";

interface ModalProps {
  cenario: Cenario | null;
  onClose: () => void;
}

export default function ModalCenario({ cenario, onClose }: ModalProps) {
  const [secondaryModalContent, setSecondaryModalContent] = useState<
    string | null
  >(null);

  if (!cenario) return null;

  const fields = [
    { label: "ID", value: cenario.id },
    { label: "Descrição", value: cenario.descricao },
    { label: "Tipo de Cenário", value: cenario.tipoCenario },
    { label: "Canal", value: cenario.canal },
    { label: "Código da Mensagem", value: cenario.codigoMsg },
    { label: "Conta Cedente", value: cenario.contaCedente },
    { label: "Conta Cessionário", value: cenario.contaCessionaria },
    { label: "Emissor", value: cenario.emissor },
    { label: "Valor Financeiro", value: cenario.valorFinanceiro },
  ];

  const handleOpenSecondaryModal = (content: string) => {
    setSecondaryModalContent(content);
  };

  const closeSecondaryModal = () => {
    setSecondaryModalContent(null);
  };

  return (
    <>
      <Overlay>
        <ModalContent>
          <h2>Detalhes do Cenário</h2>
          <CloseButton onClick={onClose}>×</CloseButton>
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
            {cenario.xml && (
              <DetailRow>
                <DetailLabel>XML:</DetailLabel>
                <DetailValue>
                  <Button onClick={() => handleOpenSecondaryModal(cenario.xml)}>
                    <FiEye size={16} />
                    XML
                  </Button>
                </DetailValue>
              </DetailRow>
            )}
            {cenario.stringSelic && (
              <DetailRow>
                <DetailLabel>String Selic:</DetailLabel>
                <DetailValue>
                  <Button
                    onClick={() =>
                      handleOpenSecondaryModal(cenario.stringSelic)
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

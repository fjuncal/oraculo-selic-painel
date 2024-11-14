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
} from "./styles/TabelaCenarioStyles";

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
    { label: "Data de Inclusão", value: cenario.dataInclusao },
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
          <CloseButton onClick={onClose}>×</CloseButton>
          <h2>Detalhes do Cenário</h2>
          <DetailTable>
            {fields.map(
              (field, index) =>
                field.value && (
                  <DetailRow key={index}>
                    <DetailLabel>{field.label}:</DetailLabel>
                    <DetailValue>{field.value}</DetailValue>
                  </DetailRow>
                )
            )}
            {cenario.xml && (
              <DetailRow>
                <DetailLabel>XML:</DetailLabel>
                <DetailValue>
                  <Button onClick={() => handleOpenSecondaryModal(cenario.xml)}>
                    Visualizar XML
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
                    Visualizar String Selic
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
            <CloseButton onClick={closeSecondaryModal}>×</CloseButton>
            <h2>Conteúdo Detalhado</h2>
            <ContentWrapper>{secondaryModalContent}</ContentWrapper>
          </ModalContent>
        </Overlay>
      )}
    </>
  );
}

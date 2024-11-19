import { useState } from "react";
import styled from "styled-components";
import RelacionamentoModal from "../Relate/RelacionamentoModal";

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  tipoPassoTeste: string;
  dataInclusao: string;
}

interface PassosTestesTableProps {
  passosTestes?: PassoTeste[];
  onOrderChange: (orderedPassosTestes: PassoTeste[]) => void;
}

export default function PassosTestesRelacionamentoTabela({
  passosTestes = [],
  onOrderChange,
}: PassosTestesTableProps) {
  const [selectedPassoTeste, setSelectedPassoTeste] =
    useState<PassoTeste | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localPassosTestes, setLocalPassosTestes] = useState(passosTestes);

  if (!passosTestes.length) {
    return (
      <p style={{ marginTop: "5px", color: "red" }}>
        Nenhum passo teste associado.
      </p>
    );
  }

  const handleOpenModal = (passoTeste: PassoTeste) => {
    setSelectedPassoTeste(passoTeste);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPassoTeste(null);
    setIsModalOpen(false);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return; // Já está no topo
    const updated = [...localPassosTestes];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setLocalPassosTestes(updated);
    onOrderChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === localPassosTestes.length - 1) return; // Já está na base
    const updated = [...localPassosTestes];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setLocalPassosTestes(updated);
    onOrderChange(updated);
  };

  return (
    <>
      <StyledTableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>ID</StyledTh>
              <StyledTh>Descrição</StyledTh>
              <StyledTh>Código Mensagem</StyledTh>
              <StyledTh>Tipo</StyledTh>
              <StyledTh>Data Inclusão</StyledTh>
              <StyledTh>Ordenação</StyledTh>
              <StyledTh>Ação</StyledTh>
            </tr>
          </thead>
          <tbody>
            {passosTestes.map((passoTeste, index) => (
              <StyledRow key={passoTeste.id}>
                <StyledTd>{passoTeste.id}</StyledTd>
                <StyledTd>{passoTeste.descricao}</StyledTd>
                <StyledTd>{passoTeste.codigoMsg}</StyledTd>
                <StyledTd>{passoTeste.tipoPassoTeste}</StyledTd>
                <StyledTd>
                  {new Date(passoTeste.dataInclusao).toLocaleDateString()}
                </StyledTd>
                <StyledTd>
                  <ActionButton
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0} // Desabilitar botão "Subir" se for o primeiro
                  >
                    ↑
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleMoveDown(index)}
                    disabled={index === localPassosTestes.length - 1} // Desabilitar botão "Descer" se for o último
                  >
                    ↓
                  </ActionButton>
                </StyledTd>
                <StyledTd>
                  <DetalhesButton onClick={() => handleOpenModal(passoTeste)}>
                    Ver Detalhes
                  </DetalhesButton>
                </StyledTd>
              </StyledRow>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
      <RelacionamentoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        passoTeste={selectedPassoTeste}
      />
    </>
  );
}

const StyledTableContainer = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledTh = styled.th`
  background-color: #4f46e5;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const StyledRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const StyledTd = styled.td`
  padding: 10px;
  font-size: 0.9rem;
  border-bottom: 1px solid #eee;
`;

const DetalhesButton = styled.button`
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #3730a3;
    transform: scale(1.05);
  }
`;

const ActionButton = styled.button`
  margin: 0 4px;
  padding: 4px 8px;
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #3730a3;
  }
`;

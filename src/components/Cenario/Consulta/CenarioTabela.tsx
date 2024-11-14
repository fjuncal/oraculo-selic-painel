import { useState } from "react";
import {
  ActionButton,
  StyledRow,
  StyledTable,
  TableContainer,
  Td,
  Th,
} from "./styles/TabelaCenarioStyles";
import ModalCenario from "./ModalCenario";

export interface Cenario {
  id: number;
  descricao: string;
  tipoCenario: string;
  dataInclusao: string;
  codigoMsg: string;
  canal: string;
  contaCedente: string;
  contaCessionaria: string;
  emissor: string;
  valorFinanceiro: string;
}

interface CenarioTableProps {
  cenarios: Cenario[];
  onDetalheClick: (id: number) => void;
}

export default function CenarioTabela({
  cenarios,
  onDetalheClick,
}: CenarioTableProps) {
  const [selectedCenario, setSelectedCenario] = useState<Cenario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleDetalheClick = (cenario: Cenario) => {
    setSelectedCenario(cenario);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCenario(null);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Mensagem</Th>
            <Th>Descrição</Th>
            <Th>Tipo</Th>
            <Th>Data de Inclusão</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {cenarios.map((cenario) => (
            <StyledRow key={cenario.id}>
              <Td>{cenario.id}</Td>
              <Td>{cenario.codigoMsg}</Td>
              <Td>{cenario.descricao}</Td>
              <Td>{cenario.tipoCenario}</Td>
              <Td>{formatDateTime(cenario.dataInclusao)}</Td>
              <Td>
                <ActionButton onClick={() => handleDetalheClick(cenario)}>
                  Ver Detalhes
                </ActionButton>
              </Td>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
      {isModalOpen && (
        <ModalCenario cenario={selectedCenario} onClose={closeModal} />
      )}
    </TableContainer>
  );
}

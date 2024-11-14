import {
  ActionButton,
  StyledRow,
  StyledTable,
  TableContainer,
  Td,
  Th,
} from "./styles/TabelaCenarioStyles";

interface Cenario {
  id: number;
  descricao: string;
  tipo: string;
  dataInclusao: string;
}

interface CenarioTableProps {
  cenarios: Cenario[];
  onDetalheClick: (id: number) => void;
}

export default function CenarioTabela({
  cenarios,
  onDetalheClick,
}: CenarioTableProps) {
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
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <Th>ID</Th>
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
              <Td>{cenario.descricao}</Td>
              <Td>{cenario.tipo}</Td>
              <Td>{formatDateTime(cenario.dataInclusao)}</Td>
              <Td>
                <ActionButton onClick={() => onDetalheClick(cenario.id)}>
                  Ver Detalhes
                </ActionButton>
              </Td>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

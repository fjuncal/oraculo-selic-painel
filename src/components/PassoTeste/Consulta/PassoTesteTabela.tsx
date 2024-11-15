import {
  ActionButton,
  StyledRow,
  StyledTable,
  TableContainer,
  Td,
  Th,
} from "./styles/PassoTesteStyles";

export interface PassoTeste {
  id: number;
  descricao: string;
  tipoPassoTeste: string;
  dataInclusao: string;
  codigoMsg: string;
  canal: string;
  contaCedente: string;
  contaCessionaria: string;
  emissor: string;
  valorFinanceiro: string;
  xml: string;
  stringSelic: string;
}

interface PassoTesteTableProps {
  passosTestes: PassoTeste[];
  onDetalheClick: (passoTeste: PassoTeste) => void;
  onSelectPassoTeste: (passoTesteId: number) => void;
  selectedPassosTestes: number[];
}

export default function PassoTesteTabela({
  passosTestes,
  onDetalheClick,
  onSelectPassoTeste,
  selectedPassosTestes,
}: PassoTesteTableProps) {
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
            <Th>Selecionar</Th>
            <Th>ID</Th>
            <Th>Mensagem</Th>
            <Th>Descrição</Th>
            <Th>Tipo</Th>
            <Th>Data de Inclusão</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {passosTestes &&
            passosTestes.map((passoTeste) => (
              <StyledRow key={passoTeste.id}>
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedPassosTestes.includes(passoTeste.id)}
                    onChange={() => onSelectPassoTeste(passoTeste.id)}
                  />
                </Td>
                <Td>{passoTeste.id}</Td>
                <Td>{passoTeste.codigoMsg}</Td>
                <Td>{passoTeste.descricao}</Td>
                <Td>{passoTeste.tipoPassoTeste}</Td>
                <Td>{formatDateTime(passoTeste.dataInclusao)}</Td>
                <Td>
                  <ActionButton onClick={() => onDetalheClick(passoTeste)}>
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

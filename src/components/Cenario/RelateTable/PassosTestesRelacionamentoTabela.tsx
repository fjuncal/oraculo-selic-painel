import styled from "styled-components";

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  tipoPassoTeste: string;
  dataInclusao: string;
}

interface PassosTestesTableProps {
  passosTestes?: PassoTeste[]; // Torna `passosTestes` opcional
}

export default function PassosTestesRelacionamentoTabela({
  passosTestes = [], // Define um valor padrão como array vazio
}: PassosTestesTableProps) {
  if (!passosTestes.length) {
    return (
      <p style={{ marginTop: "5px", color: "red" }}>
        Nenhum passo teste associado.
      </p>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Descrição</Th>
          <Th>Código Mensagem</Th>
          <Th>Tipo</Th>
          <Th>Data Inclusão</Th>
          <Th>Ação</Th>
        </tr>
      </thead>
      <tbody>
        {passosTestes.map((passoTeste) => (
          <tr key={passoTeste.id}>
            <Td>{passoTeste.id}</Td>
            <Td>{passoTeste.descricao}</Td>
            <Td>{passoTeste.codigoMsg}</Td>
            <Td>{passoTeste.tipoPassoTeste}</Td>
            <Td>{new Date(passoTeste.dataInclusao).toLocaleDateString()}</Td>
            <Td>
              <DetalhesButton onClick={() => alert(JSON.stringify(passoTeste))}>
                Ver Detalhes
              </DetalhesButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

const DetalhesButton = styled.button`
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #3730a3;
  }
`;

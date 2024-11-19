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
}

export default function PassosTestesRelacionamentoTabela({
  passosTestes = [],
}: PassosTestesTableProps) {
  const [selectedPassoTeste, setSelectedPassoTeste] =
    useState<PassoTeste | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
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
                <DetalhesButton onClick={() => handleOpenModal(passoTeste)}>
                  Ver Detalhes
                </DetalhesButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <RelacionamentoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        passoTeste={selectedPassoTeste}
      />
    </>
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

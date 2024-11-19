import PassosTestesRelacionamentoTabela from "@/components/Cenario/RelateTable/PassosTestesRelacionamentoTabela";
import { buscarCenariosComPassosTestes } from "@/services/cenarioService";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  tipoPassoTeste: string;
  dataInclusao: string;
}

interface Cenario {
  id: number;
  descricao: string;
  tipo: string;
  dataInclusao: string;
  passosTestes: PassoTeste[];
}

export default function CenariosPage() {
  const [cenarios, setCenarios] = useState<Cenario[]>([]);
  const [expandedCenario, setExpandedCenario] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await buscarCenariosComPassosTestes();
        setCenarios(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar cenários:", error);
        setError("Erro ao carregar cenários. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (cenarioId: number) => {
    setExpandedCenario(expandedCenario === cenarioId ? null : cenarioId);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageContainer>
      <h1 style={{ textAlign: "center" }}>Cenários e Passos Testes</h1>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Descrição</Th>
            <Th>Tipo</Th>
            <Th>Data Inclusão</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {cenarios.map((cenario) => (
            <>
              <tr key={cenario.id}>
                <Td>{cenario.id}</Td>
                <Td>{cenario.descricao}</Td>
                <Td>{cenario.tipo}</Td>
                <Td>{new Date(cenario.dataInclusao).toLocaleDateString()}</Td>
                <Td>
                  <ActionButton onClick={() => toggleExpand(cenario.id)}>
                    {expandedCenario === cenario.id ? "Esconder" : "Expandir"}
                  </ActionButton>
                </Td>
              </tr>
              {expandedCenario === cenario.id && (
                <ExpandedRow>
                  <td colSpan={5}>
                    <PassosTestesRelacionamentoTabela
                      passosTestes={cenario.passosTestes}
                    />
                  </td>
                </ExpandedRow>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #3730a3;
  }
`;

const ExpandedRow = styled.tr`
  background-color: #f9fafb;
`;

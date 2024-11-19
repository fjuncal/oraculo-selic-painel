import PassosTestesRelacionamentoTabela from "@/components/Cenario/RelateTable/PassosTestesRelacionamentoTabela";
import SnackbarComponent from "@/components/SnackbarComponent";
import {
  buscarCenariosComPassosTestes,
  enviarCenario,
} from "@/services/cenarioService";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiSend } from "react-icons/fi";
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
  const [selectedCenario, setSelectedCenario] = useState<number | null>(null); // ID do cenário selecionado
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

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

  const toggleSelectCenario = (cenarioId: number) => {
    setSelectedCenario(selectedCenario === cenarioId ? null : cenarioId);
  };

  const handleEnviarCenario = async () => {
    if (!selectedCenario) return;

    try {
      // Obtém o cenário completo baseado no ID selecionado
      const cenarioToSend = cenarios.find(
        (cenario) => cenario.id === selectedCenario
      );

      if (!cenarioToSend) throw new Error("Cenário não encontrado.");

      await enviarCenario(cenarioToSend);

      setSnackbarMessage("Cenário enviado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao enviar cenário.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <PageContainer>
      <Title>Cenários e Passos Testes</Title>
      <StyledTable>
        <thead>
          <tr>
            <Th>Selecionar</Th>
            <Th>ID</Th>
            <Th>Descrição</Th>
            <Th>Tipo</Th>
            <Th>Data Inclusão</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {cenarios.map((cenario) => (
            <React.Fragment key={cenario.id}>
              <Row isExpanded={expandedCenario === cenario.id}>
                <Td>
                  <Checkbox
                    type="checkbox"
                    checked={selectedCenario === cenario.id}
                    onChange={() => toggleSelectCenario(cenario.id)}
                  />
                </Td>
                <Td>{cenario.id}</Td>
                <Td>{cenario.descricao}</Td>
                <Td>{cenario.tipo}</Td>
                <Td>{new Date(cenario.dataInclusao).toLocaleDateString()}</Td>
                <Td>
                  <ExpandButton onClick={() => toggleExpand(cenario.id)}>
                    {expandedCenario === cenario.id ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </ExpandButton>
                </Td>
              </Row>
              {expandedCenario === cenario.id && (
                <ExpandedRow>
                  <td colSpan={6}>
                    <PassosTestesRelacionamentoTabela
                      passosTestes={cenario.passosTestes}
                    />
                  </td>
                </ExpandedRow>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </StyledTable>
      <SendButton onClick={handleEnviarCenario} disabled={!selectedCenario}>
        <FiSend size={16} />
        Enviar Cenário
      </SendButton>
      <SnackbarComponent
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #4f46e5;
  color: #fff;
`;

const Row = styled.tr<{ isExpanded: boolean }>`
  background-color: ${(props) => (props.isExpanded ? "#eef2ff" : "#fff")};
  &:hover {
    background-color: #f9fafb;
  }
`;

const ExpandedRow = styled.tr`
  background-color: #eef2ff;
  transition: all 0.3s ease-in-out;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #4f46e5;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #3730a3;
  }
`;

const SendButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #3730a3;
  }
`;

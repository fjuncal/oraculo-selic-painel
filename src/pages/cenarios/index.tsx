import PassosTestesRelacionamentoTabela from "@/components/Cenario/RelateTable/PassosTestesRelacionamentoTabela";
import SnackbarComponent from "@/components/SnackbarComponent";
import {
  buscarCenariosComPassosTestes,
  enviarCenario,
} from "@/services/cenarioService";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
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
    <>
      <PageContainer>
        <h1 style={{ textAlign: "center" }}>Cenários e Passos Testes</h1>
        <Table>
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
                <tr>
                  <Td>
                    <input
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
                    <ActionButton onClick={() => toggleExpand(cenario.id)}>
                      {expandedCenario === cenario.id ? "Esconder" : "Expandir"}
                    </ActionButton>
                  </Td>
                </tr>
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
        </Table>
        <Button onClick={handleEnviarCenario} disabled={!selectedCenario}>
          <FiSend size={16} />
          Enviar Cenário
        </Button>
        <SnackbarComponent
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        />
      </PageContainer>
    </>
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

const Button = styled.button`
  padding: 8px 16px;
  margin-top: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: inline-flex;
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

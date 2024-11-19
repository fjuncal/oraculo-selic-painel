import PassosTestesRelacionamentoTabela from "@/components/Cenario/RelateTable/PassosTestesRelacionamentoTabela";
import SnackbarComponent from "@/components/SnackbarComponent";
import {
  buscarCenariosComPassosTestes,
  enviarCenario,
} from "@/services/cenarioService";
import { FiChevronDown, FiChevronUp, FiSend } from "react-icons/fi";
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
  const [selectedCenario, setSelectedCenario] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);
  const [filters, setFilters] = useState({
    descricao: "",
    tipo: "",
    dataInicio: "",
    dataFim: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await buscarCenariosComPassosTestes();
        setCenarios(data);
      } catch (error) {
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

    const cenarioToSend = cenarios.find(
      (cenario) => cenario.id === selectedCenario
    );
    if (!cenarioToSend) return;

    try {
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

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredCenarios = cenarios.filter((cenario) => {
    const dataInclusao = new Date(cenario.dataInclusao);
    const dataInicio = filters.dataInicio ? new Date(filters.dataInicio) : null;
    const dataFim = filters.dataFim ? new Date(filters.dataFim) : null;

    return (
      (!filters.descricao ||
        cenario.descricao
          .toLowerCase()
          .includes(filters.descricao.toLowerCase())) &&
      (!filters.tipo ||
        cenario.tipo.toLowerCase().includes(filters.tipo.toLowerCase())) &&
      (!dataInicio || dataInclusao >= dataInicio) &&
      (!dataFim || dataInclusao <= dataFim)
    );
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <Title>Filtrar Cenários</Title>
      <FiltersContainer>
        <Input
          placeholder="Descrição"
          value={filters.descricao}
          onChange={(e) => handleFilterChange("descricao", e.target.value)}
        />
        <Input
          placeholder="Tipo"
          value={filters.tipo}
          onChange={(e) => handleFilterChange("tipo", e.target.value)}
        />
        <Input
          type="date"
          placeholder="Data Início"
          value={filters.dataInicio}
          onChange={(e) => handleFilterChange("dataInicio", e.target.value)}
        />
        <Input
          type="date"
          placeholder="Data Fim"
          value={filters.dataFim}
          onChange={(e) => handleFilterChange("dataFim", e.target.value)}
        />
      </FiltersContainer>

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
          {filteredCenarios.map((cenario) => (
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

const Title = styled.h2`
  margin-bottom: 10px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  flex: 1;
  font-size: 0.9rem;

  &:focus {
    border-color: #4f46e5;
    outline: none;
  }
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

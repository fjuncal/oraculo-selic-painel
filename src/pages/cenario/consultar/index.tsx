// src/pages/cenarios/index.tsx
import React, { useState } from "react";
import { useBuscarCenarios } from "@/components/Cenario/Consulta/hooks/useBuscarCenarios";
import CenarioTabela, {
  Cenario,
} from "@/components/Cenario/Consulta/CenarioTabela";
import styled from "styled-components";
import ModalCenario from "@/components/Cenario/Consulta/ModalCenario";
import { enviarCenarios } from "@/services/cenarioService";
import { Alert, Snackbar } from "@mui/material";
import CenarioFiltro from "@/components/Cenario/Consulta/CenarioFiltro";
import { FiSend } from "react-icons/fi";

export default function Cenarios() {
  const { cenarios, carregando } = useBuscarCenarios();
  const [selectedCenarios, setSelectedCenarios] = useState<number[]>([]);
  const [selectedCenario, setSelectedCenario] = useState<Cenario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [codigoMensagem, setCodigoMensagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoCenario, setTipoCenario] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const cenariosFiltrados = cenarios.filter((cenario: Cenario) => {
    const dataInclusao = new Date(cenario.dataInclusao);

    return (
      (!codigoMensagem ||
        cenario.codigoMsg
          ?.toLowerCase()
          .includes(codigoMensagem.toLowerCase())) &&
      (!descricao ||
        cenario.descricao?.toLowerCase().includes(descricao.toLowerCase())) &&
      (!tipoCenario ||
        cenario.tipoCenario
          ?.toLowerCase()
          .includes(tipoCenario.toLowerCase())) &&
      (!startDate || dataInclusao >= new Date(startDate)) &&
      (!endDate || dataInclusao <= new Date(endDate))
    );
  });

  if (carregando) return <p>Carregando...</p>;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDetalheClick = (cenario: Cenario) => {
    setSelectedCenario(cenario);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCenario(null);
  };

  // Função para selecionar/desmarcar cenários
  const toggleSelectCenario = (cenarioId: number) => {
    setSelectedCenarios((prevSelected) =>
      prevSelected.includes(cenarioId)
        ? prevSelected.filter((id) => id !== cenarioId)
        : [...prevSelected, cenarioId]
    );
  };

  // Função para enviar cenários selecionados
  const handleEnviarCenarios = async () => {
    try {
      // Filtra os cenários selecionados
      const cenariosSelecionados = cenarios.filter((c: Cenario) =>
        selectedCenarios.includes(c.id)
      );
      console.log(cenariosSelecionados);

      // Envia a lista de cenários selecionados para o backend
      await enviarCenarios(cenariosSelecionados);

      // Limpa a seleção após o envio
      setSelectedCenarios([]);
      setSnackbarMessage("Cenários enviados com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao enviar cenários.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <PageContainer>
      <Title>Consulta de Cenários</Title>
      <CenarioFiltro
        codigoMensagem={codigoMensagem}
        setCodigoMensagem={setCodigoMensagem}
        descricao={descricao}
        setDescricao={setDescricao}
        tipoCenario={tipoCenario}
        setTipoCenario={setTipoCenario}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Button
        onClick={handleEnviarCenarios}
        disabled={selectedCenarios.length === 0}
      >
        <FiSend size={16} style={{ marginRight: "3px" }} />
        Enviar Cenários Selecionados
      </Button>
      <CenarioTabela
        cenarios={cenariosFiltrados}
        onDetalheClick={handleDetalheClick}
        onSelectCenario={toggleSelectCenario}
        selectedCenarios={selectedCenarios}
      />
      {isModalOpen && (
        <ModalCenario cenario={selectedCenario} onClose={closeModal} />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px; /* Reduzi o padding */
  margin-bottom: 10px; /* Menor margem inferior */
  font-size: 0.9rem; /* Fonte um pouco menor */
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 4px; /* Bordas mais suaves */
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px; /* Espaço entre o texto e o ícone */

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover:enabled {
    background-color: #3730a3;
    transform: scale(1.02); /* Leve aumento no hover */
  }
`;

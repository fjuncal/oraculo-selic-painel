// src/pages/cenarios/index.tsx
import React, { useState } from "react";
import styled from "styled-components";
import ModalCenario from "@/components/PassoTeste/Consulta/PassoTesteModal";
import { Alert, Snackbar } from "@mui/material";
import CenarioFiltro from "@/components/PassoTeste/Consulta/PassoTesteFiltro";
import { FiSend } from "react-icons/fi";
import { enviarPassoTeste } from "@/services/passoTesteService";
import { useBuscarPassosTestes } from "@/components/PassoTeste/Consulta/hooks/useBuscarPassoTeste";
import PassoTesteTabela, {
  PassoTeste,
} from "@/components/PassoTeste/Consulta/PassoTesteTabela";

export default function PassosTestes() {
  const { passosTestes, carregando } = useBuscarPassosTestes();
  const [selectedPassosTestes, setSelectedPassosTestes] = useState<number[]>(
    []
  );
  const [selectedPassoTeste, setSelectedPassoTeste] =
    useState<PassoTeste | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [codigoMensagem, setCodigoMensagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoPassoTeste, setTipoPassoTeste] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const passosTestesFiltrados =
    passosTestes &&
    passosTestes.filter((passoTeste: PassoTeste) => {
      const dataInclusao = new Date(passoTeste.dataInclusao);

      return (
        (!codigoMensagem ||
          passoTeste.codigoMsg
            ?.toLowerCase()
            .includes(codigoMensagem.toLowerCase())) &&
        (!descricao ||
          passoTeste.descricao
            ?.toLowerCase()
            .includes(descricao.toLowerCase())) &&
        (!tipoPassoTeste ||
          passoTeste.tipoPassoTeste
            ?.toLowerCase()
            .includes(tipoPassoTeste.toLowerCase())) &&
        (!startDate || dataInclusao >= new Date(startDate)) &&
        (!endDate || dataInclusao <= new Date(endDate))
      );
    });

  if (carregando) return <p>Carregando...</p>;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDetalheClick = (passoTeste: PassoTeste) => {
    setSelectedPassoTeste(passoTeste);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPassoTeste(null);
  };

  // Função para selecionar/desmarcar passo teste
  const toggleSelectPassoTeste = (passoTesteId: number) => {
    setSelectedPassosTestes((prevSelected) =>
      prevSelected.includes(passoTesteId)
        ? prevSelected.filter((id) => id !== passoTesteId)
        : [...prevSelected, passoTesteId]
    );
  };

  // Função para enviar passos testes selecionados
  const handleEnviarPassoTeste = async () => {
    try {
      // Filtra os passos testes selecionados
      const passosTesteSelecionados = passosTestes.filter((pt: PassoTeste) =>
        selectedPassosTestes.includes(pt.id)
      );
      console.log(passosTesteSelecionados);

      // Envia a lista de passo teste selecionados para o backend
      await enviarPassoTeste(passosTesteSelecionados);

      // Limpa a seleção após o envio
      setSelectedPassosTestes([]);
      setSnackbarMessage("Passos testes enviados com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao enviar passos testes.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <PageContainer>
      <Title>Consulta de Passo Teste</Title>
      <CenarioFiltro
        codigoMensagem={codigoMensagem}
        setCodigoMensagem={setCodigoMensagem}
        descricao={descricao}
        setDescricao={setDescricao}
        tipoCenario={tipoPassoTeste}
        setTipoCenario={setTipoPassoTeste}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Button
        onClick={handleEnviarPassoTeste}
        disabled={selectedPassosTestes.length === 0}
      >
        <FiSend size={16} />
        Enviar Cenários
      </Button>
      <PassoTesteTabela
        passosTestes={passosTestesFiltrados}
        onDetalheClick={handleDetalheClick}
        onSelectPassoTeste={toggleSelectPassoTeste}
        selectedPassosTestes={selectedPassosTestes}
      />
      {isModalOpen && (
        <ModalCenario passoTeste={selectedPassoTeste} onClose={closeModal} />
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

import React, { useState } from "react";
import styled from "styled-components";
import { Alert, Snackbar } from "@mui/material";
import { FiSend } from "react-icons/fi";
import { enviarPassoTeste } from "@/services/passoTesteService";
import { useBuscarPassosTestes } from "@/components/PassoTeste/Consulta/hooks/useBuscarPassoTeste";
import PassoTesteTabela, {
  PassoTeste,
} from "@/components/PassoTeste/Consulta/PassoTesteTabela";
import PassoTesteFiltro from "@/components/PassoTeste/Consulta/PassoTesteFiltro";
import PassoTesteModal from "@/components/PassoTeste/Consulta/PassoTesteModal";

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

  return (
    <PageContainer>
      <Title>Consulta de Passo Teste</Title>
      <PassoTesteFiltro
        codigoMensagem={codigoMensagem}
        setCodigoMensagem={setCodigoMensagem}
        descricao={descricao}
        setDescricao={setDescricao}
        tipoPassoTeste={tipoPassoTeste}
        setTipoPassoTeste={setTipoPassoTeste}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <PassoTesteTabela
        passosTestes={passosTestesFiltrados}
        onDetalheClick={handleDetalheClick}
        onSelectPassoTeste={toggleSelectPassoTeste}
        selectedPassosTestes={selectedPassosTestes}
      />
      {isModalOpen && (
        <PassoTesteModal passoTeste={selectedPassoTeste} onClose={closeModal} />
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

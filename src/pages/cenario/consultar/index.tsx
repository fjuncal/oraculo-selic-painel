// src/pages/cenarios/index.tsx
import React, { useState } from "react";
import { useBuscarCenarios } from "@/components/Cenario/Consulta/hooks/useBuscarCenarios";
import CenarioTabela, {
  Cenario,
} from "@/components/Cenario/Consulta/CenarioTabela";
import styled from "styled-components";
import ModalCenario from "@/components/Cenario/Consulta/ModalCenario";
import { enviarCenarios } from "@/services/cenarioService";

export default function Cenarios() {
  const { cenarios, carregando } = useBuscarCenarios();
  const [selectedCenarios, setSelectedCenarios] = useState<number[]>([]);
  const [selectedCenario, setSelectedCenario] = useState<Cenario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (carregando) return <p>Carregando...</p>;

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
      alert("Cenários enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar cenários:", error);
      alert("Ocorreu um erro ao enviar os cenários.");
    }
  };

  return (
    <PageContainer>
      <Title>Consulta de Cenários</Title>
      <Button
        onClick={handleEnviarCenarios}
        disabled={selectedCenarios.length === 0}
      >
        Enviar Cenários Selecionados
      </Button>
      <CenarioTabela
        cenarios={cenarios}
        onDetalheClick={handleDetalheClick}
        onSelectCenario={toggleSelectCenario}
        selectedCenarios={selectedCenarios}
      />
      {isModalOpen && (
        <ModalCenario cenario={selectedCenario} onClose={closeModal} />
      )}
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
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:hover:enabled {
    background-color: #3730a3;
  }
`;

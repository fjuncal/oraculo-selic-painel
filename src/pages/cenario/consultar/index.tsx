// src/pages/cenarios/index.tsx
import React from "react";
import { useBuscarCenarios } from "@/components/Cenario/Consulta/hooks/useBuscarCenarios";
import CenarioTabela from "@/components/Cenario/Consulta/CenarioTabela";
import styled from "styled-components";

export default function Cenarios() {
  const { cenarios, carregando } = useBuscarCenarios();

  if (carregando) return <p>Carregando...</p>;

  // Função para ação de clique no botão "Ver Detalhes"
  const handleDetalheClick = (id: number) => {
    console.log("Detalhes do cenário com ID:", id);
    // Implementar a lógica para exibir detalhes do cenário
  };

  return (
    <PageContainer>
      <Title>Consulta de Cenários</Title>
      <CenarioTabela cenarios={cenarios} onDetalheClick={handleDetalheClick} />
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

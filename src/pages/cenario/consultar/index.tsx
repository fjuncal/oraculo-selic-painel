// src/pages/cenarios/index.tsx
import React from "react";
import { useBuscarCenarios } from "@/components/Cenario/Consulta/hooks/useBuscarCenarios";
import styled from "styled-components";
import GenericTable from "@/components/TabelaPadronizada";

export default function Cenarios() {
  const { cenarios, carregando } = useBuscarCenarios();

  if (carregando) return <p>Carregando...</p>;

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Descrição", accessor: "descricao" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Data", accessor: "data" },
  ];

  return (
    <PageContainer>
      <Title>Consulta de Cenários</Title>
      <GenericTable data={cenarios} columns={columns} />
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

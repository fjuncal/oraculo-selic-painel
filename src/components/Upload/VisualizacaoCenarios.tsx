import React from "react";
import styled from "styled-components";

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  tipoPassoTeste: string;
}

interface Cenario {
  id: number;
  descricao: string;
  tipo: string;
  passosTestes: PassoTeste[];
}

interface VisualizacaoCenariosProps {
  cenarios: Cenario[];
}

export default function VisualizacaoCenarios({
  cenarios,
}: VisualizacaoCenariosProps) {
  return (
    <Container>
      <h2>Cenários Criados</h2>
      {cenarios.map((cenario) => (
        <CenarioContainer key={cenario.id}>
          <h3>{cenario.descricao}</h3>
          <p>Tipo: {cenario.tipo}</p>
          <TabelaPassosTestes>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Mensagem</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {cenario.passosTestes.map((passo) => (
                <tr key={passo.id}>
                  <td>{passo.id}</td>
                  <td>{passo.descricao}</td>
                  <td>{passo.codigoMsg}</td>
                  <td>{passo.tipoPassoTeste}</td>
                </tr>
              ))}
            </tbody>
          </TabelaPassosTestes>
        </CenarioContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
`;

const CenarioContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9fafb;
`;

const TabelaPassosTestes = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #fff;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #4f46e5;
    color: #fff;
  }
`;

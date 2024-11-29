import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Container>
      <Tabs>
        {cenarios.map((cenario, index) => (
          <Tab
            key={cenario.id}
            active={index === activeTab}
            onClick={() => handleTabChange(index)}
          >
            {cenario.descricao.length > 50
              ? `${cenario.descricao.slice(0, 50)}...`
              : cenario.descricao}{" "}
          </Tab>
        ))}
      </Tabs>

      <TabContent>
        {cenarios.map((cenario, index) => (
          <CenarioContent key={cenario.id} hidden={index !== activeTab}>
            <Header>
              <h3>{cenario.descricao}</h3>
              <span>Tipo: {cenario.tipo}</span>
            </Header>
            <Table>
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
            </Table>
          </CenarioContent>
        ))}
      </TabContent>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px auto;
  max-width: 800px;
  background: #f9fafb;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "#4f46e5" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#4f46e5")};
  padding: 10px 15px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px 4px 0 0;

  &:hover {
    background: #3730a3;
    color: #fff;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const CenarioContent = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: #4f46e5;
  color: white;
  padding: 10px;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  background: white;

  th {
    background: #4f46e5;
    color: white;
    text-align: left;
    padding: 8px;
  }

  td {
    padding: 8px;
    border: 1px solid #ddd;
  }
`;

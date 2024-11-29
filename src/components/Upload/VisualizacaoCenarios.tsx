import React, { useState } from "react";
import styled from "styled-components";
import PassoTesteModal from "../PassoTeste/Consulta/PassoTesteModal"; // Importando o modal

interface PassoTeste {
  id: number;
  descricao: string;
  codigoMsg: string;
  tipoPassoTeste: string;
  canal: string;
  contaCedente: string;
  contaCessionaria: string;
  emissor: string;
  valorFinanceiro: string;
  xml?: string;
  stringSelic?: string;
  dataInclusao: string;
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
  const [selectedPassoTeste, setSelectedPassoTeste] =
    useState<PassoTeste | null>(null);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleCloseModal = () => {
    setSelectedPassoTeste(null);
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
              <h3>
                (ID: {cenario.id}) {cenario.descricao}
              </h3>
              <span>Tipo: {cenario.tipo}</span>
            </Header>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Mensagem</th>
                  <th>Tipo</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {cenario.passosTestes.map((passo) => (
                  <tr key={passo.id}>
                    <td>{passo.id}</td>
                    <td>{passo.descricao}</td>
                    <td>{passo.codigoMsg}</td>
                    <td>{passo.tipoPassoTeste}</td>
                    <td>
                      <Button onClick={() => setSelectedPassoTeste(passo)}>
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CenarioContent>
        ))}
      </TabContent>

      {/* Modal */}
      {selectedPassoTeste && (
        <PassoTesteModal
          passoTeste={{
            ...selectedPassoTeste,
            xml: selectedPassoTeste?.xml || "", // Garante que xml será uma string
            stringSelic: selectedPassoTeste?.stringSelic || "", // Garante que stringSelic será uma string
          }}
          onClose={handleCloseModal}
        />
      )}
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

const Button = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #3730a3;
  }
`;

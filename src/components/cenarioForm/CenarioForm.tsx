import { useState } from "react";
import { FieldConfig, mensagemConfig } from "../../assets/mensagemConfig";
import ScenarioFormField from "./CenarioFormField";
import styled from "styled-components";

export default function CenarioForm() {
  const [codigoMensagem, setCodigoMensagem] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodigoMensagem(e.target.value);
    setFormData({});
  };

  const selectedConfig = mensagemConfig[codigoMensagem];

  return (
    <PageContainer>
      <Title>Cadastrar Cenário</Title>

      <SelectWrapper>
        <Label>Código da Mensagem:</Label>
        <Select value={codigoMensagem} onChange={handleCodigoChange}>
          <option value="">Selecione</option>
          <option value="SEL1052">SEL1052</option>
          <option value="SEL1054">SEL1054</option>
        </Select>
      </SelectWrapper>

      {selectedConfig && (
        <FormContainer>
          {Object.entries(selectedConfig).map(([setor, fields]) => (
            <Sector key={setor}>
              <SectorTitle>
                {setor === "informacoesBasicas"
                  ? "Informações Básicas"
                  : "Detalhes Financeiros"}
              </SectorTitle>
              <FieldsContainer>
                {fields.map((field: FieldConfig) => (
                  <ScenarioFormField
                    key={field.name}
                    field={field}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                  />
                ))}
              </FieldsContainer>
            </Sector>
          ))}
          <SubmitButton type="submit">Salvar Cenário</SubmitButton>
        </FormContainer>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9fafb;
`;

const Title = styled.h2`
  color: #4f46e5;
  font-size: 2rem;
  text-align: left;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Sector = styled.div`
  flex: 1 1 45%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

const SectorTitle = styled.h3`
  color: #4f46e5;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  &:hover {
    background-color: #3730a3;
  }
`;

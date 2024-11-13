import { useState } from "react";
import { FieldConfig, mensagemConfig } from "../../assets/mensagemConfig";
import ScenarioFormField from "./CenarioFormField";
import styled from "styled-components";

export default function CenarioForm() {
  const [codigoMensagem, setCodigoMensagem] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [descricao, setDescricao] = useState<string>("");
  const [tipoCenario, setTipoCenario] = useState<string>(
    "Corretagem intermediação"
  );
  const [canal, setCanal] = useState<string>("Mensageria");

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

      <FixedFieldsContainer>
        <InputWrapper>
          <Label>Descrição do Cenário:</Label>
          <TextArea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite uma descrição para o cenário"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Tipo de Cenário:</Label>
          <Select
            value={tipoCenario}
            onChange={(e) => setTipoCenario(e.target.value)}
          >
            <option value="Simulação">Simulação</option>
            <option value="Produção">Produção</option>
          </Select>
        </InputWrapper>

        <InputWrapper>
          <Label>Canal:</Label>
          <Select value={canal} onChange={(e) => setCanal(e.target.value)}>
            <option value="Mensageria">Mensageria</option>
            <option value="IOS">IOS</option>
          </Select>
        </InputWrapper>
      </FixedFieldsContainer>

      <SelectWrapper>
        <Label>Código da Mensagem:</Label>
        <CustomSelect value={codigoMensagem} onChange={handleCodigoChange}>
          <option value="">Selecione</option>
          {Object.keys(mensagemConfig).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </CustomSelect>
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

const FixedFieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
  resize: vertical;
  min-height: 40px; /* Controla a altura mínima */
  max-height: 120px; /* Controla a altura máxima */
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
`;

const CustomSelect = styled.select`
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s ease;
  appearance: none;

  &:hover {
    border-color: #3730a3;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
  }
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

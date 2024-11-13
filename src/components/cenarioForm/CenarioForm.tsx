import { useState } from "react";
import { mensagemConfig } from "../../assets/mensagemConfig";
import CenarioFormField from "./CenarioFormField";
import styled from "styled-components";
import { generateXML } from "../../utils/generateXML";
import { getCamposParaCodigoMensagem } from "@/assets/config-form/configHelper";
import { FormularioConfig } from "@/assets/formulariosConfig";

export default function CenarioForm() {
  const [codigoMensagem, setCodigoMensagem] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [descricao, setDescricao] = useState<string>("");
  const [tipoCenario, setTipoCenario] = useState<string>(
    "Corretagem intermediação"
  );
  const [canal, setCanal] = useState<string>("");
  const [xmlContent, setXmlContent] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodigoMensagem(e.target.value);
    setFormData({});
  };

  const handleCanalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCanal(e.target.value);
  };

  const handleVisualizeClick = () => {
    if (canal === "MENSAGERIA") {
      const xml = generateXML(formData, codigoMensagem);
      setXmlContent(xml);
      console.log(xml);
    } else {
      console.log("Exibindo String SELIC...");
    }
  };

  // Chama a função para carregar os campos corretos com base no código da mensagem
  const campos =
    codigoMensagem in mensagemConfig
      ? getCamposParaCodigoMensagem(
          codigoMensagem as keyof typeof mensagemConfig
        )
      : null;

  return (
    <PageContainer>
      <Header>
        <Title>Cadastrar Cenário</Title>
      </Header>
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
          <Select value={canal} onChange={handleCanalChange}>
            <option value="">Selecione o Canal</option>
            <option value="MENSAGERIA">Mensageria</option>
            <option value="IOS">IOS</option>
          </Select>
        </InputWrapper>
      </FixedFieldsContainer>
      <SelectWrapper>
        <Label>Código da Mensagem:</Label>
        <CustomSelect value={codigoMensagem} onChange={handleCodigoChange}>
          <option value="">Selecione</option>
          {/* Mapeia as chaves de mensagemConfig diretamente para exibir todas as opções */}
          {Object.keys(mensagemConfig).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </CustomSelect>
      </SelectWrapper>
      <BotaoVisualizar>
        {canal && (
          <VisualizeButton onClick={handleVisualizeClick}>
            {canal === "MENSAGERIA"
              ? "Visualizar XML"
              : "Visualizar String SELIC"}
          </VisualizeButton>
        )}
      </BotaoVisualizar>
      {xmlContent && <XmlViewer>{xmlContent}</XmlViewer>}{" "}
      {/* Exibe o XML gerado */}
      {campos && (
        <FormContainer>
          {Object.entries(campos).map(([setor, fields]) => (
            <Sector key={setor}>
              <SectorTitle>
                {setor === "informacoesBasicas"
                  ? "Informações Básicas"
                  : "Detalhes Financeiros"}
              </SectorTitle>
              <FieldsContainer>
                {fields
                  .filter(
                    (field): field is FormularioConfig => field !== undefined
                  )
                  .map((field: FormularioConfig) => (
                    <CenarioFormField
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

const XmlViewer = styled.pre`
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  white-space: pre-wrap;
  font-family: monospace;
  margin-top: 20px;
`;

const BotaoVisualizar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #4f46e5;
  font-size: 2rem;
  margin: 0;
`;

const VisualizeButton = styled.button`
  padding: 8px 16px;
  background-color: #4f46e5;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;

  &:hover {
    background-color: #3730a3;
  }
`;

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9fafb;
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

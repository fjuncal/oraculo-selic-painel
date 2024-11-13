import { useState } from "react";
import { mensagemConfig } from "../../assets/mensagemConfig";
import CenarioFormField from "./CenarioFormField";
import styled from "styled-components";
import { generateXML } from "../../utils/generateXML";
import { getCamposParaCodigoMensagem } from "@/assets/config-form/configHelper";
import { FormularioConfig } from "@/assets/formulariosConfig";
import { generatePositionalString } from "@/utils/generatePositionalString";
import Modal from "./Modal";
import { saveCenario } from "@/services/cenarioService";

export default function CenarioForm() {
  const [codigoMensagem, setCodigoMensagem] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [descricao, setDescricao] = useState<string>("");
  const [tipoCenario, setTipoCenario] = useState<string>(
    "Corretagem intermediação"
  );
  const [canal, setCanal] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value; // Converte para número se for do tipo number
    setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCodigoMensagem(e.target.value);
    setFormData({});
    setErrors({});
  };

  const handleCanalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCanal(e.target.value);
  };

  const validateFields = () => {
    const campos = getCamposParaCodigoMensagem(
      codigoMensagem as keyof typeof mensagemConfig
    );
    const newErrors: { [key: string]: boolean } = {};

    Object.entries(campos || {}).forEach(([sector, fields]) => {
      if (Array.isArray(fields)) {
        (fields as FormularioConfig[]).forEach((field) => {
          if (field?.required && !formData[field.name]) {
            newErrors[field.name] = true;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      const xmlContent =
        canal === "MENSAGERIA" ? generateXML(formData, codigoMensagem) : null;
      const stringSelicContent =
        canal === "IOS"
          ? generatePositionalString(formData, codigoMensagem)
          : null;

      const cenarioData = {
        descricao,
        tipoCenario,
        canal,
        codigoMsg: codigoMensagem,
        ...formData, // Inclui os campos dinâmicos do formulário
        XML: xmlContent,
        stringSelic: stringSelicContent,
      };

      try {
        const result = await saveCenario(cenarioData);
        alert(`Cenário salvo com sucesso! ID: ${result.id}`);
        setDescricao("");
        setTipoCenario("Corretagem intermediação");
        setCanal("");
        setCodigoMensagem("");
        setFormData({});
        setErrors({});
      } catch (error) {
        alert("Erro ao salvar cenário");
      }
    } else {
      console.log("Campos obrigatórios não preenchidos");
    }
  };

  const handleVisualizeClick = () => {
    let title = "";
    let content = "";

    if (canal === "MENSAGERIA") {
      title = "Visualizar XML";
      content = generateXML(formData, codigoMensagem);
    } else {
      title = "Visualizar String SELIC";
      content = generatePositionalString(formData, codigoMensagem);
    }

    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

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
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        content={modalContent}
      />
      {campos && (
        <FormContainer>
          {/* Renderiza dinamicamente os setores com base no arquivo de configuração */}
          {Object.entries(campos).map(([sector, fields]) => (
            <Sector key={sector}>
              <SectorTitle>{sector}</SectorTitle>
              <FieldsContainer>
                {(fields as FormularioConfig[])
                  .filter(
                    (
                      field: FormularioConfig | undefined
                    ): field is FormularioConfig => field !== undefined
                  )
                  .map((field: FormularioConfig) => (
                    <CenarioFormField
                      key={field.name}
                      field={field}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      error={!!errors[field.name]}
                    />
                  ))}
              </FieldsContainer>
            </Sector>
          ))}
        </FormContainer>
      )}
      {codigoMensagem && (
        <ButtonContainer>
          <SubmitButton onClick={handleFormSubmit}>Salvar Cenário</SubmitButton>
        </ButtonContainer>
      )}
    </PageContainer>
  );
}

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
  flex: 1 1 48%; /* Ocupa 48% da largura para permitir dois setores lado a lado */
  max-width: 48%; /* Limita a largura máxima do setor a 48% */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  /* Alinha o setor no centro se houver apenas um setor na linha */
  &:only-child {
    margin-left: auto;
    margin-right: auto;
  }
`;
const SectorTitle = styled.h3`
  color: #4f46e5;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Espaçamento entre os campos */

  /* Define que cada campo ocupe 100% da largura em telas pequenas */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Alinha o conteúdo (botão) à direita */
  margin-top: 16px;
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

  &:hover {
    background-color: #3730a3;
  }
`;

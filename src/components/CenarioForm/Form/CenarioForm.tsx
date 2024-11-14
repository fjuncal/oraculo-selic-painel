import { getCamposParaCodigoMensagem } from "@/assets/config-form/configHelper";
import { FormularioConfig } from "@/assets/formulariosConfig";
import { salvarCenario } from "@/services/cenarioService";
import { generatePositionalString } from "@/utils/generatePositionalString";
import { useState } from "react";
import { mensagemConfig } from "../../../assets/mensagemConfig";
import { generateXML } from "../../../utils/generateXML";
import CenarioFormField from "../Form/CenarioFormField";
import Modal from "../Form/Modal";
import {
  BotaoVisualizar,
  ButtonContainer,
  CustomSelect,
  FieldsContainer,
  FixedFieldsContainer,
  FormContainer,
  Header,
  InputWrapper,
  Label,
  PageContainer,
  Sector,
  SectorTitle,
  Select,
  SelectWrapper,
  SubmitButton,
  TextArea,
  Title,
  VisualizeButton,
} from "./styles";

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
        const result = await salvarCenario(cenarioData);
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
    console.log("Dados do formData:", formData);
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
